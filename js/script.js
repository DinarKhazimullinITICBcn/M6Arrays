			
// POKEMONS

let dades;
let arrayTotal = [];

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
    arrayTotal.push(data.pokemon);
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
    arrayTotal.push(data.elements);
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
    arrayTotal.push(data);
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
    arrayTotal.push(data.movies);
});

function inicialitza() {
    location.reload();
}
//Ordre ascendent
function ascendent() {
    arrayTotal.sort();
    alert("Ordenat de manera ascendent: " + JSON.stringify(arrayTotal));
}
//ordre descendent
function descendent() {
    arrayTotal.sort();
    arrayTotal.reverse();
    alert("Ordenat de manera ascendent: " + JSON.stringify(arrayTotal));
}
//Fa que el array es fagi flat per a que busqui per tots els arrays, i buscar per name, nom o title,
//ja que no totes les dades tenen els mateixos camps
function buscar() {
    arrayTotal = arrayTotal.flat();
    let objecte = prompt("Escriu un objecte a buscar").toLowerCase();
    let flatArray = arrayTotal.flat();
    let resultat = flatArray.filter(item => 
        (item.name && item.name.toLowerCase().includes(objecte)) ||
        (item.nom && item.nom.toLowerCase().includes(objecte)) ||
        (item.title && item.title.toLowerCase().includes(objecte))
    );
    alert("Resultats: " + JSON.stringify(resultat));
}
// La mitjana es fa del rating de les pelicules, que es el ultim bloc afegit al array
function mitjana() {
    let ultimBloc = arrayTotal[arrayTotal.length - 1];
    let suma = ultimBloc.reduce((a, b) => a + b.rating, 0);
    let mitjana = suma / ultimBloc.length;
    alert("Mitjana: " + mitjana);   
}

function ordenaPersonalitzat() {
    let ordre = prompt("Insereix el ordre que vols (asc o desc)");
    if (ordre === "asc") {
        ordena(ordre);
    } else if (ordre === "desc") {
        ordena(ordre);
    } else {
        alert("Parametre no valid")
    }
}

function ordena(ordre) {
    if (ordre === "asc") {
        arrayTotal.sort();
    } else if (ordre === "desc") {
        arrayTotal.sort();
        arrayTotal.reverse();
    }
    alert(JSON.stringify(arrayTotal));
}

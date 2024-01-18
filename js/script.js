			
// array

let array = [];
let arrayCarregat = [];
// POKEMONS
function guardarInformacio(name) {
    fetch(`js/data/${name}.json`)
    .then((response) => response.json())
    .then((data) => {
        if (name === "pokemon") {
            array = data.pokemon.map(pokemon => ([
                pokemon.num,
                pokemon.name,
                pokemon.img,
                parseFloat(pokemon.weight)
            ]));
        }
    });
}


// MUNICIPIS
//fetch("js/data/municipis.json")
//.then((response) => response.json())
//.then((data) => {
//    arrayMunicipis.push(data);
//});

// METEORITS
//fetch("js/data/earthMeteorites.json")
//.then((response) => response.json())
//.then((data) => {
//    arrayMeteorits.push(data);
//});

// MOVIES
//fetch("js/data/movies.json")
//.then((response) => response.json())
//.then((data) => {
//    arrayMovies.push(data);
//});

// Carregar buttons
function carregarButtons(nom) {
    let div = document.getElementById('buttons');

    let inicialitza = `<button onclick="recarrega()">Recarrega</button>`
    div.innerHTML = inicialitza;

    let ordenaAsc = `<button onclick="ordenarAsc('${nom}')">Ordena de manera ascendent</button>`
    div.innerHTML += ordenaAsc;

    let ordenaDesc = `<button onclick="ordenarDesc('${nom}')">Ordena de manera descendent</button>`
    div.innerHTML += ordenaDesc;

    let buscar = `<button onclick="buscar('${nom}')">Buscar per nom</button>`
    div.innerHTML += buscar;

    let calcularMitjana = `<button onclick="calcularMitjana('${nom}')">Calcula mitjana del ultim bloc afegit</button>`
    div.innerHTML += calcularMitjana;
    
    let orderList = `<button onclick="orderList('${nom}')">Ordena de maner ascendent o descendent</button>`
    div.innerHTML += orderList;

    let searchList = `<button onclick="searchList('${nom}')">Busca la posicio del ${nom}</button>`
    div.innerHTML += searchList;
}
// Funcio taula de pokemons:
function crearTaula(array, name) {
    let taula = document.getElementById('taula');
    if (name === "pokemon"){
        let informacio = "<thead><tr><th>Pokedex</th><th>Imatge</th><th>Nom</th><th>Pes</th></tr></thead>"
        for (let i = 0; i < array.length; i++){
            informacio += `<tr><td><p>${array[i][0]}</p></td><td><img src="${array[i][1]}" alt="${array[i][0]}"></td><td><p>${array[i][0]}</p></td><td><p>${array[i][2]}</p></td></tr>`;
        }        
        taula.innerHTML = informacio;  
    }
}
// Ordenar de manera ascenden
function ordenarAsc(nom) {
    if (nom === "pokemon") {
        array.sort((a, b) => a[0] - b[0]);
        arrayCarregat = array;
        crearTaula(array, nom);
    }
}
// Ordenar de manera descendent
function ordenarDesc(nom) {
    if (nom === "pokemon") {
        array.sort((a, b) => b[0] - a[0]);
        arrayCarregat = array;
        crearTaula(array, nom);
    }
}
// Buscar per nom
function buscar(nom) {
    if (nom === "pokemon") {
        let nomABuscar = prompt("Escriu el nom d'un pokemon");
        let arrayBusqueda = array.filter(pokemon => pokemon[1].toLowerCase().includes(nomABuscar.toLowerCase()));
        arrayCarregat = arrayBusqueda;
        crearTaula(arrayBusqueda, nom);
    }
}
// Calcula mitjana 
function calcularMitjana(name) {
    let divMitjana = document.getElementById('mitjana');
    if (arrayCarregat.length !== 0) {
        if (name === "pokemon") {
            let pesTotal = arrayCarregat.reduce((total, pokemon) => {
                let pes = pokemon[2];
                return total + pes;
            }, 0);
            let mitjana = Math.floor(pesTotal/arrayCarregat.length) + ' Kg';
            divMitjana.innerHTML = mitjana;
        }
    } else {
        alert('No es pot calcular la mitjana d\'una llista buida. Siusplay, intenteu ordenar o buscar la informacio abans d\'intentar-ho');
    }
}
//Ordenar per parametre afegit del usuari:
function orderList(nom) {
    let loop = true;
    let parametre = '';
    while (loop) {
        let parametre = prompt('Vols ordenar la llista de manera ascendent o descendent?\n1. Asc\n2. Desc\n3. Sortir');
        parametre = parametre.toLowerCase();
        if (parametre === 'asc' || parametre === 'desc' || parametre === 'sortir') {
            loop = false;
        } else {
            alert('Insereix una opcio correcte.')
        }
    }
    if (parametre === 'asc') {
        ordenarAsc(nom);
    } else {
        ordenarDesc(nom);
    }
}
//Buscar un element en la llista
function searchList(nom) {
    let buscar = prompt('Insereix el nom del objecte del qual vols sapiguer la posicio');
    if (nom === 'pokemon'){
        let pokemon = array.find(pokemon => pokemon[1].toLowerCase() === buscar.toLowerCase());
        if (pokemon) {
            let posicio = array.indexOf(pokemon);
            alert('El Pokémon es troba a la posició ' + posicio + ' de la llista.');
        } else {
            alert('El Pokémon no es troba a la llista.');
        }
    }
}
//Butons
function recarrega() {
    location.reload();
}
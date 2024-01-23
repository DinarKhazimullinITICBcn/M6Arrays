			
// array
let array = [];
let arrayCarregat = [];
let medida = "";
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
            medida = 'kg';
        }
        if (name === "municipis") {
            array = Object.values(data.elements).map(municipi => ([
                municipi.ine,
                municipi.municipi_nom,
                municipi.municipi_vista,
                parseFloat(municipi.nombre_habitants)
            ]));
            medida = 'habitants'
        }
        if (name === "movies") {
            array = data.movies.map(movie => ([
                movie.year,
                movie.title,
                movie.url,
                parseFloat(movie.rating)
            ]));
            medida = 'ratings';
        }
        if (name === "earthMeteorites") {
            array = data.map(meteorite => {
                let mass = meteorite.mass ? parseFloat(meteorite.mass) : 0;
                if (isNaN(mass)) {
                    mass = 0;
                }
                return [
                    meteorite.name,
                    meteorite.id,
                    new Date(meteorite.year),
                    mass
                ];
            });
            medida = 'kg';
        }
        
        
    });
}
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

    let calcularMitjana = `<button onclick="calcularMitjana()">Calcula mitjana del ultim bloc afegit</button>`
    div.innerHTML += calcularMitjana;
    
    let orderList = `<button onclick="orderList('${nom}')">Ordena de maner ascendent o descendent</button>`
    div.innerHTML += orderList;

    let searchList = `<button onclick="searchList('${nom}')">Busca la posicio del ${nom}</button>`
    div.innerHTML += searchList;
}
// Funcio taula de pokemons:
function crearTaula(array, nom) {
    let taula = document.getElementById('taula');
    let informacio = "<thead><tr><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>"
    if (nom === 'pokemon') {
        informacio = "<thead><tr><th>Pokedex</th><th>Imatge</th><th>Nom</th><th>Pes</th></tr></thead>"
    }
    for (let i = 0; i < array.length; i++){
        if (nom !== 'earthMeteorites') {
            informacio += `<tr><td><p>${array[i][0]}</p></td><td><img src="${array[i][2]}" alt="${array[i][1]}"></td><td><p>${array[i][1]}</p></td><td><p>${array[i][3]}</p></td></tr>`;
        } else {
            informacio += `<tr><td><p>${array[i][0]}</p></td><td><p>${array[i][2]}</p></td><td><p>${array[i][1]}</p></td><td><p>${array[i][3]}</p></td></tr>`;
        }
    }       
    taula.innerHTML = informacio;  
}
// Ordenar de manera ascenden
function ordenarAsc(nom) {
    array.sort((a, b) => a[0] - b[0]);
    arrayCarregat = array;
    crearTaula(array, nom);
}
// Ordenar de manera descendent
function ordenarDesc(nom) {
    array.sort((a, b) => b[0] - a[0]);
    arrayCarregat = array;
    crearTaula(array, nom);
}
// Buscar per nom
function buscar(nom) {
    let nomABuscar = prompt("Escriu el nom d'un " + nom);
    let arrayBusqueda = array.filter(objecte => objecte[1].toLowerCase().includes(nomABuscar.toLowerCase()));
    arrayCarregat = arrayBusqueda;
    crearTaula(arrayBusqueda, nom);
}

// Calcula mitjana 
function calcularMitjana() {
    let divMitjana = document.getElementById('mitjana');
    if (arrayCarregat.length !== 0) {
        let pesTotal = arrayCarregat.reduce((total, objecte) => {
            let pes = objecte[3];
            return total + pes;
        }, 0);
        let mitjana = Math.floor(pesTotal/arrayCarregat.length) + ' ' + medida;
        divMitjana.innerHTML = mitjana;
    } else {
        alert('No es pot calcular la mitjana d\'una llista buida. Siusplay, intenteu ordenar o buscar la informacio abans d\'intentar-ho');
    }
}

//Ordenar per parametre afegit del usuari:
function orderList(nom) {
    let loop = true;
    let parametre = '';
    while (loop) {
        parametre = prompt('Vols ordenar la llista de manera ascendent o descendent?\n1. Asc\n2. Desc\n3. Sortir');
        parametre = parametre.toLowerCase();
        if (parametre === 'asc' || parametre === 'desc' || parametre === 'sortir') {
            loop = false;
        } else {
            alert('Insereix una opcio correcte.')
        }
    }
    if (parametre === 'asc') {
        ordenarAsc(nom);
    } else if (parametre === 'desc') {
        ordenarDesc(nom);
    }
}
//Buscar un element en la llista
function searchList(nom) {
    let buscar = prompt('Insereix el nom del objecte del qual vols sapiguer la posicio');
    let objecte = array.find(objecte => objecte[1].toLowerCase() === buscar.toLowerCase());
    if (objecte) {
        let posicio = array.indexOf(objecte);
        alert('El ' + nom + ' es troba a la posició ' + posicio + ' de la llista.');
    } else {
        alert('El ' + nom + ' no es troba a la llista.');
    }  
}
//Butons
function recarrega() {
    location.reload();
}
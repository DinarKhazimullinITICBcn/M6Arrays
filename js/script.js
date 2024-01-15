			
// array

let array = [];
let arrayCarregat = [];
// POKEMONS
function guardarInformacio(name) {
    fetch(`js/data/${name}.json`)
    .then((response) => response.json())
    .then((data) => {
        if (name === "pokemon") {
            array = data.pokemon.map(pokemon => ({
                num: pokemon.num,
                img: pokemon.img,
                name: pokemon.name,
                weight: pokemon.weight
            }));
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
}
// Funcio taula de pokemons:
function crearTaula(array, name) {
    let taula = document.getElementById('taula');
    if (name === "pokemon"){
        let informacio = "<thead><tr><th>Pokedex</th><th>Imatge</th><th>Nom</th><th>Pes</th></tr></thead>"
        for (let i = 0; i < array.length; i++){
            informacio += `<tr><td><p>${array[i].num}</p></td><td><img src="${array[i].img}" alt="${array[i].name}"></td><td><p>${array[i].name}</p></td><td><p>${array[i].weight}</p></td></tr>`;
        }
    }
    taula.innerHTML = informacio;
}
// Ordenar de manera ascenden
function ordenarAsc(nom) {
    if (nom === "pokemon") {
        array.sort((a, b) => a.id - b.id);
        arrayCarregat = array;
        crearTaula(array, nom);
    }
}
// Ordenar de manera descendent
function ordenarDesc(nom) {
    if (nom === "pokemon") {
        array.sort((a, b) => b.id - a.id);
        arrayCarregat = array;
        crearTaula(array, nom);
    }
}
// Buscar per nom
function buscar(nom) {
    if (nom === "pokemon") {
        let nomABuscar = prompt("Escriu el nom d'un pokemon");
        let arrayBusqueda = array.filter(pokemon => pokemon.name.toLowerCase().includes(nomABuscar.toLowerCase()));
        crearTaula(arrayBusqueda, nom);
    }
}
// Calcula mitjana 
function calcularMitjana(name) {
    let divMitjana = document.getElementById('mitjana');
    if (name === "pokemon") {
        let pesTotal = array.reduce((total, pokemon) => {
            let pes = Number(pokemon.weight.replace(' kg', ''));
            return total + pes;
        }, 0);
        let mitjana = Math.floor(pesTotal/arrayPokemons.length);
        divMitjana.innerHTML = mitjana;
    }
}
//Butons
function recarrega() {
    location.reload();
    alert("Funciona");
}
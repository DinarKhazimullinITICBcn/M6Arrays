			
// POKEMONS

let dades;
let arrayPokemons = [];
let arrayMunicipis = [];
let arrayMeteorits = [];
let arrayMovies = [];

// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
    arrayPokemons.push(data);
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
    arrayMunicipis.push(data);
});

// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
    arrayMeteorits.push(data);
});

// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
    arrayMovies.push(data);
});

// Carregar buttons
function carregarButtons(nom) {
    let div = document.getElementById('buttons');

    let inicialitza = `<button onclick="recarrega()">Recarrega</button>`
    div.innerHTML = inicialitza;

    let ordenaAsc = `<button onclick="ordenarAsc('${nom}')">Ordena de manera ascendent</button>`
    div.innerHTML += ordenaAsc;
    alert(nom);
}
// Ordenar de manera ascenden
function ordenarAsc(nom) {
    if (nom === "pokemon") {
        arrayPokemons.sort((a, b) => a.id - b.id);
        let taula = "<table border-collapse: collapse; border='1'>"
    }
}

//Butons
function recarrega() {
    location.reload();
    alert("Funciona");
}
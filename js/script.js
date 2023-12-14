			
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
    arrayPokemons.push(data.pokemon);
});

// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
    arrayMunicipis.push(data.elements);
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
    arrayMovies.push(data.movies);
});

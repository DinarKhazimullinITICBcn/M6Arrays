			
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

console.log(arrayTotal);
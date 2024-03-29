// array
let array = [];
let arrayCarregat = [];
let arrayLables = [];
let arrayDadesGraf = [];
let descripcio = '';
let chart;
let medida = "";
let nom = ""
// POKEMONS
function guardarInformacio(name) {
    nom = name;
    arrayLables = [];
    arrayDadesGraf = [];
    fetch(`js/data/${name}.json`)
    .then((response) => response.json())
    .then((data) => {
        if (name === "pokemon") {
            data.pokemon.forEach(pokemon => {
                pokemon.type.forEach(type => {
                    let index = arrayLables.indexOf(type);
                    if (index === -1) {
                        arrayLables.push(type);
                        arrayDadesGraf.push(1);
                    } else {
                        arrayDadesGraf[index]++;
                    }
                });
            });
            array = data.pokemon.map(pokemon => ([
                pokemon.num,
                pokemon.img,
                pokemon.name,
                parseFloat(pokemon.weight)
            ]));
            medida = 'kg';
            descripcio = 'Tipus de pokemon';
        }
        if (name === "municipis") {
            array = Object.values(data.elements).map(municipi => ([
                municipi.ine,
                municipi.municipi_vista,
                municipi.municipi_nom,
                parseFloat(municipi.nombre_habitants)
            ]));
            medida = 'habitants'
        }
        if (name === "movies") {
            data.movies.forEach(movie => {
                movie.genres.forEach(genres => {
                    let index = arrayLables.indexOf(genres);
                    if (index === -1) {
                        arrayLables.push(genres);
                        arrayDadesGraf.push(1);
                    } else {
                        arrayDadesGraf[index]++;
                    }
                });
            });
            array = data.movies.map(movie => ([
                movie.year,
                movie.url,
                movie.title,
                parseFloat(movie.rating)
            ]));
            medida = 'ratings';
            descripcio = 'Genres de pelicules';
        }
        if (name === "earthMeteorites") {
            array = data.map(meteorite => {
                let mass = meteorite.mass ? parseFloat(meteorite.mass) : 0;
                if (isNaN(mass)) {
                    mass = 0;
                }
                return [
                    meteorite.id,
                    new Date(meteorite.year),
                    meteorite.name,
                    mass
                ];
            });
            medida = 'kg';
        }
        arrayCarregat = array; 
        printList(array);
        console.log(arrayLables)
        console.log(arrayDadesGraf)
    });
}
// Carregar buttons
function carregarButtons(nom) {
    if (chart) {
        console.log("entra a chart")
        chart.destroy();
        chart = null;
    }
    let div = document.getElementById('buttons');
    let divBuscar = document.getElementById('inputBuscador');
    let inicialitza = `<button onclick="recarrega()">Recarrega</button>`
    let ordenaAsc = `<button onclick="ordenarAsc(0)">Ordena de manera ascendent</button>`
    let ordenaDesc = `<button onclick="ordenarDesc(0)">Ordena de manera descendent</button>`
    let calcularMitjana = `<button onclick="calcularMitjana()">Calcula mitjana del ultim bloc afegit</button>`
    let orderList = `<button onclick="orderList()">Ordena de maner ascendent o descendent</button>`
    let searchList = `<button onclick="searchList()">Busca la posicio del ${nom}</button>`
    let mostrarGrafic = `<button onclick="mostrarGrafic()">Mostrar grafic de ${nom}</button>`
    div.innerHTML = inicialitza + ordenaAsc + ordenaDesc + calcularMitjana + orderList + searchList + mostrarGrafic;
    
    let buscar = `<input type="text" id="busca" placeholder="Escriu el nom d'un ${nom}">    `
    divBuscar.innerHTML = buscar;
    setTimeout(function() {
        document.getElementById('busca').addEventListener('input', buscarElement);
    }, 0);

}
// Funcio taula de pokemons:
function printList(array) {
    calcularMitjana();
    let taula = document.getElementById('taula');
    let informacio = 
    `<thead>
        <tr>
            <th>
                <div id='formatTaula'>
                    Id
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc(0)"></button>
                        <button onclick="ordenarDesc(0)"></button>
                    </div>
                </div>
            </th>
            <th>
                Data
            </th>
            <th>
                <div id='formatTaula'>
                    Nom
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 2)"></button>
                        <button onclick="ordenarDesc( 2)"></button>
                    </div>
                </div>
            </th>
            <th>
                <div id='formatTaula'>
                    Massa
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 3)"></button>
                        <button onclick="ordenarDesc( 3)"></button>
                    </div>
                </div>
            </th>
        </tr>
    </thead>`
    if (nom === 'pokemon') {
        informacio = `<thead>
        <tr>
            <th>
                <div id='formatTaula'>
                    Pokedex
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 0)"></button>
                        <button onclick="ordenarDesc( 0)"></button>
                    </div>
                </div>
            </th>
            <th>
                Imatge
            </th>
            <th>
                <div id='formatTaula'>
                    Nom
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 2)"></button>
                        <button onclick="ordenarDesc( 2)"></button>
                    </div>
                </div>
            </th>
            <th>
                <div id='formatTaula'>
                    Pes
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 3)"></button>
                        <button onclick="ordenarDesc( 3)"></button>
                    </div>
                </div>
            </th>
        </tr>
    </thead>`;
    } else if (nom === 'municipis') {
        informacio = `<thead>
        <tr>
            <th>
                <div id='formatTaula'>
                    Ine
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 0)"></button>
                        <button onclick="ordenarDesc( 0)"></button>
                    </div>
                </div>
            </th>
            <th>
                Imatge
            </th>
            <th>
                <div id='formatTaula'>
                    Nom
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 2)"></button>
                        <button onclick="ordenarDesc( 2)"></button>
                    </div>
                </div>
            </th>
            <th>
                <div id='formatTaula'>
                    Habitants
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 3)"></button>
                        <button onclick="ordenarDesc( 3)"></button>
                    </div>
                </div>
            </th>
        </tr>
    </thead>`;
    } else if (nom === 'movies') {
        informacio = `<thead>
        <tr>
            <th>
                <div id='formatTaula'>
                    Any
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 0)"></button>
                        <button onclick="ordenarDesc( 0)"></button>
                    </div>
                </div>
            </th>
            <th>
                Imatge
            </th>
            <th>
                <div id='formatTaula'>
                    Nom
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 2)"></button>
                        <button onclick="ordenarDesc( 2)"></button>
                    </div>
                </div>
            </th>
            <th>
                <div id='formatTaula'>
                    Rating
                    <div id='buttonsTaula'>
                        <button onclick="ordenarAsc( 3)"></button>
                        <button onclick="ordenarDesc( 3)"></button>
                    </div>
                </div>
            </th>
        </tr>
    </thead>`;
    }
    array.forEach(objecte => {
        if (nom !== 'earthMeteorites') {
            informacio += `<tr><td><p>${objecte[0]}</p></td><td><img src="${objecte[1]}" alt="${objecte[2]}"></td><td><p>${objecte[2]}</p></td><td><p>${objecte[3]}</p></td></tr>`;
        } else {
            informacio += `<tr><td><p>${objecte[0]}</p></td><td><p>${objecte[1]}</p></td><td><p>${objecte[2]}</p></td><td><p>${objecte[3]}</p></td></tr>`;
        }
    });           
    taula.innerHTML = informacio;  
}
// Ordenar de manera ascenden
function ordenarAsc(num) {
    if (num !== 2) {
        arrayCarregat.sort((a, b) => a[num] - b[num]);
    } else {
        arrayCarregat.sort((a, b) => a[num].localeCompare(b[num]));
    }
    printList(arrayCarregat);
}

function ordenarDesc(num) {
    if (num !== 2) {
        arrayCarregat.sort((a, b) => b[num] - a[num]);
    } else {
        arrayCarregat.sort((a, b) => b[num].localeCompare(a[num]));
    }
    printList(arrayCarregat);
}

// Buscar per nom
function buscarElement(input) {
    let nomABuscar = input.target.value;
    if (nomABuscar !== "") {
        arrayCarregat = array.filter(objecte => objecte[2].toLowerCase().includes(nomABuscar.toLowerCase()));
    } else {
        arrayCarregat = array;
    }
    printList(arrayCarregat);
}

// Calcula mitjana 
function calcularMitjana() {
    let divMitjana = document.getElementById('mitjana');
    if (arrayCarregat.length !== 0) {
        let pesTotal = arrayCarregat.reduce((total, objecte) => {
            let pes = objecte[3];
            return total + pes;
        }, 0);
        let mitjana = (pesTotal/arrayCarregat.length).toFixed(2) + ' ' + medida;
        divMitjana.innerHTML = mitjana;
    } else {
        alert('No es pot calcular la mitjana d\'una llista buida. Siusplay, intenteu ordenar o buscar la informacio abans d\'intentar-ho');
    }
}

//Ordenar per parametre afegit del usuari:
function orderList() {
    let parametre = '';
    while (true) {
        parametre = prompt('Vols ordenar la llista de manera ascendent o descendent?\n1. Asc\n2. Desc\n3. Sortir');
        parametre = parametre.toLowerCase();
        if (parametre === 'asc' || parametre === 'desc' || parametre === 'sortir') {
            break;
        } else {
            alert('Insereix una opcio correcte.')
        }
    }
    if (parametre === 'asc') {
        ordenarAsc(0);
    } else if (parametre === 'desc') {
        ordenarDesc(0);
    }
}
//Buscar un element en la llista
function searchList() {
    let buscar = prompt('Insereix el nom del objecte del qual vols sapiguer la posicio');
    let objecte = arrayCarregat.find(objecte => objecte[2].toLowerCase() === buscar.toLowerCase());
    if (objecte) {
        let posicio = arrayCarregat.indexOf(objecte);
        alert('El ' + nom + ' es troba a la posició ' + posicio + ' de la llista.');
    } else {
        alert('El ' + nom + ' no es troba a la llista.');
    }  
}
//Butons
function recarrega() {
    location.reload();
}
// Chart
function mostrarGrafic() {
    const data = {
        labels: arrayLables,
        datasets: [{
        label: descripcio,
        data: arrayDadesGraf,
        backgroundColor: [
            'rgb(102, 209, 173, 0.2)',
            'rgb(255, 23, 147, 0.2)',
            'rgb(0, 128, 43, 0.2)',
            'rgb(84, 46, 99, 0.2)',
            'rgb(244, 78, 59, 0.2)',
            'rgb(26, 188, 156, 0.2)',
            'rgb(172, 57, 219, 0.2)',
            'rgb(24, 191, 255, 0.2)',
            'rgb(210, 73, 57, 0.2)',
            'rgb(91, 192, 235, 0.2)',
            'rgb(44, 62, 80, 0.2)',
            'rgb(243, 156, 18, 0.2)',
            'rgb(189, 195, 199, 0.2)',
            'rgb(22, 160, 133, 0.2)',
            'rgb(211, 84, 0, 0.2)'
        ],
        borderColor: [
            'rgb(102, 209, 173)',
            'rgb(255, 23, 147)',
            'rgb(0, 128, 43)',
            'rgb(84, 46, 99)',
            'rgb(244, 78, 59)',
            'rgb(26, 188, 156)',
            'rgb(172, 57, 219)',
            'rgb(24, 191, 255)',
            'rgb(210, 73, 57)',
            'rgb(91, 192, 235)',
            'rgb(44, 62, 80)',
            'rgb(243, 156, 18)',
            'rgb(189, 195, 199)',
            'rgb(22, 160, 133)',
            'rgb(211, 84, 0)'
        ],
        borderWidth: 1
        }]
    };
    const config = {
        type: 'polarArea',
        data: data,
        options: {}
    };
    const ctx = document.getElementById('myChart').getContext('2d');
    chart = new Chart(ctx, config);
}
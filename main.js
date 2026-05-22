// ======================
// DOM ELEMENTS - Elemente aus HTML auswählen und in Variablen speichern
// ======================

const pokemonList = document.querySelector("#pokemon-list");

const searchForm = document.querySelector("#search-form");

const searchInput = document.querySelector("#search-input");

const searchDialog = document.querySelector("#search-dialog");

const dialogContent = document.querySelector("#dialog-content");

const dialogClose = document.querySelector("#dialog-close");

// ======================
// Fetch-Funktion - Daten von der API holen
// ======================

fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // Limit auf 151 Pokemon gesetzt
    .then((response) => response.json())
    .then((data) => {
        const pokemonList = data.results; // Array 

        pokemonList.forEach((pokemon) => { // Hier wird jedes Pokemon einzeln 
            console.log(pokemon.name); // argumente der Funktion: pokemon
        });
    });
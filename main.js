// ======================
// DOM ELEMENTS - Elemente aus HTML auswählen und in Variablen speichern
// ======================

const pokemonContainer = document.querySelector("#pokemon-list");

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

    pokemonList.forEach((pokemon) => {
      // Hier wird fuer JEDES Pokemon im Array eine Funktion ausgefuehrt

      // Karte bauen

      const card = document.createElement("div"); // Neues Box Element im HTML
      card.classList.add("bg-white", "p-4", "rounded", "shadow");

      const id = pokemon.url.split("/")[6];

      const image = document.createElement("img");
      image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

      const name = document.createElement("h2");
      name.textContent = pokemon.name;

      const button = document.createElement("button");
      button.textContent = "Catch";
      button.classList.add("bg-blue-500", "text-white", "p-2", "rounded");

      // Catch Logik - Button erstellen

      button.addEventListener("click", () => {
        let caughtPokemon = JSON.parse(localStorage.getItem("pokedex")) || [];

        caughtPokemon.push({
          id,
          name: pokemon.name,
        });

        localStorage.setItem("pokedex", JSON.stringify(caughtPokemon)); // Click - Array laden - hinzufuegen und speichern

        alert(`${pokemon.name} caught!`); // Feedback
      });

      card.append(image, name, button); // Inhalt neues Box Element = Name des Pokemon

      pokemonContainer.append(card); // DOM Element in HTML einfuegen, Tailwind CSS Klassen
    });
  });

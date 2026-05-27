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
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {
          // Hier wird fuer JEDES Pokemon im Array eine Funktion ausgefuehrt

          // Karte bauen

          const card = document.createElement("div"); // Neues Box Element im HTML
          card.classList.add("bg-white", "p-4", "rounded", "shadow");

          const image = document.createElement("img");
          image.src = pokemonData.sprites.front_default;

          const name = document.createElement("h2");
          name.textContent = pokemonData.name;

          const stats = document.createElement("div");
          // bisschen Styling
          stats.classList.add(
            "text-sm",
            "mt-2",
            "bg-gray-100",
            "p-2",
            "rounded",
          );
          pokemonData.stats.forEach((stat) => {
            const statElement = document.createElement("p");
            statElement.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            stats.appendChild(statElement);
          });

          const button = document.createElement("button");
          button.textContent = "Catch";
          button.classList.add("bg-blue-500", "text-white", "p-2", "rounded");

          // Catch Logik - Button erstellen

          button.addEventListener("click", () => {
            let caughtPokemon =
              JSON.parse(localStorage.getItem("pokedex")) || [];

            // Doppelte Pokemon verhindern - Check, ob Pokemon bereits gefangen wurde

            const alreadyCaught = caughtPokemon.find(
              (poke) => poke.id === pokemonData.id,
            );

            if (alreadyCaught) {
              alert("Pokemon already caught!");
              return;
            }

            caughtPokemon.push({
              id: pokemonData.id,
              name: pokemonData.name,
              image: pokemonData.sprites.front_default,
              stats: pokemonData.stats,
              note: "",
            });

            localStorage.setItem("pokedex", JSON.stringify(caughtPokemon)); // Click - Array laden - hinzufuegen und speichern

            alert(`${pokemonData.name} caught!`); // Feedback
          });

          card.append(image, name, stats, button); // Inhalt neues Box Element = Name des Pokemon

          pokemonContainer.append(card); // DOM Element in HTML einfuegen, Tailwind CSS Klassen
        });
    });
  });

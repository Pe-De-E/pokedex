// Erster Versuch:
// Caught Pokemon aus localStorage lesen und Pokedex Karten individual erstellen
// Funktioniert mit main.js, aber zeigt nicht Stats und Notes

// const pokedexContainer = document.querySelector("#pokedex-list");

// const pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];

// pokedex.forEach((pokemon) => {
//     const card = document.createElement("div");
//     card.classList.add(
//     "bg-gray-500",
//     "p-4",
//     "rounded-xl",
//     "shadow-md",
//     "flex",
//     "flex-col",
//     "items-center",
//     "justify-center"
//     );
    
//     const image = document.createElement("img");
//     image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    
//     const name = document.createElement("h2");
//     name.textContent = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

//     pokedexContainer.classList.add(
//         "grid",
//         "grid-cols-2",
//         "gap-4",
//     );
    
//     card.append(image, name);
//     pokedexContainer.append(card);
// });


// Vorschlag:
// main.js sollte Folgendes speichern in localStorage:
// {
//   id,
//   name,
//   image,
//   stats,
//   note: ""
// }

// Vielleicht function in main 
// function createPokemonCard(pokemon) {
// build card
// return card;
// }


// Aktueller Vorschlag:
// Styling und stats fetch

const pokemonContainer = document.querySelector("#pokedex-list");

pokemonContainer.classList.add("grid", "grid-cols-3", "gap-4");

fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {
          const card = document.createElement("div");
          card.classList.add(
            "bg-red-600",
            "text-white",
            "p-4",
            "rounded-2xl",
            "shadow-lg",
            "flex",
            "flex-col",
            "items-center",
            "gap-3",
          );

          const image = document.createElement("img");
          image.src = pokemonData.sprites.front_default;

          image.classList.add(
              "bg-white",
              "rounded-full",
              "w-24",
              "h-24",
              "p-2"
            );

          const name = document.createElement("h2");
          name.textContent =
            pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1);

          name.classList.add("text-xl", "font-bold", "mb-2");   
          
          const stats = document.createElement("div");
          stats.classList.add("mt-2", "text-sm");

          stats.classList.add(
              "bg-red-800",
              "p-3",
              "rounded-xl",
              "text-sm",
              "w-full"
            );

          pokemonData.stats.forEach((stat) => {
            const statText = document.createElement("p");
            statText.textContent = `${stat.stat.name}: ${stat.base_stat}`;
            stats.append(statText);
          });

          const notes = document.createElement("textarea");

          notes.placeholder = "Add notes...";
              
          notes.classList.add(
            "w-full",
            "mt-3",
            "p-2",
            "rounded-lg",
            "text-black",
            "resize-none",
            "h-24"
          );

          card.append(image, name, stats, notes);
          pokemonContainer.append(card);
        });
    });
  });
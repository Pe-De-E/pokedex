const pokedexContainer = document.querySelector("#pokemon-list");

const pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];

pokedexContainer.classList.add(
  "grid",
  "grid-cols-2",
  "gap-4"
);

pokedex.forEach((pokemon) => {
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
    "gap-3"
  );

  const image = document.createElement("img");
  image.src = pokemon.image;

  image.classList.add(
    "bg-white",
    "rounded-full",
    "w-24",
    "h-24",
    "p-2"
  );

  const name = document.createElement("h2");
  name.textContent = pokemon.name;
  name.classList.add("capitalize");

  name.classList.add("text-xl", "font-bold", "mb-2");

  const stats = document.createElement("div");

  stats.classList.add(
    "bg-red-800",
    "p-3",
    "rounded-xl",
    "text-sm",
    "w-full",
    "mt-2"
  );

  pokemon.stats.forEach((stat) => {
    const statText = document.createElement("p");
    statText.textContent = `${stat.stat.name}: ${stat.base_stat}`;
    stats.append(statText);
  });

  const notes = document.createElement("textarea");

  notes.placeholder = "Add notes...";
  notes.value = pokemon.note || "";

  notes.classList.add(
    "w-full",
    "mt-3",
    "p-2",
    "rounded-lg",
    "text-black",
    "resize-none",
    "h-24"
  );

  notes.addEventListener("input", () => {
    const pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];

  const updatedPokedex = pokedex.map((poke) => {
    if (poke.id === pokemon.id) {
      return {
        ...poke,
        note: notes.value,
      };
    }
    return poke;
  })

  localStorage.setItem("pokedex", JSON.stringify(updatedPokedex))
});

  card.append(image, name, stats, notes);
  pokedexContainer.append(card);
});
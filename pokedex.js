const pokedexContainer = document.querySelector("#pokemon-list");

const pokedex = JSON.parse(localStorage.getItem("pokedex")) || [];

pokedexContainer.classList.add(
  "flex",
  "flex-col",
  "gap-3"
);

pokedex.forEach((pokemon) => {
  const card = document.createElement("div");

  card.classList.add(
    "bg-gray-100",
    "text-black",
    "p-2",
    "border-2",
    "border-gray-900",
    "rounded-none",
    "font-mono",
    "text-xs",
    "shadow-[3px_3px_0px_#222]",
    "flex",
    "flex-col",
    "gap-2",
    "w-full"
  );

  const image = document.createElement("img");
  image.src = pokemon.image;

  image.classList.add(
    "bg-white",
    "border-2",
    "border-gray-800",
    "w-16",
    "h-16",
    "p-1",
    "mx-auto",
    "pixelated"
  );

  const name = document.createElement("h2");
  name.textContent = pokemon.name;
  name.classList.add("capitalize");

  name.classList.add(
    "font-bold",
    "uppercase",
    "text-center",
    "tracking-wide"
  );

  const stats = document.createElement("div");

  stats.classList.add(
    "bg-white",
    "border-2",
    "border-gray-800",
    "p-2",
    "text-[10px]",
    "leading-tight"
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
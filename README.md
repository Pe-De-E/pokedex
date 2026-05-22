# Pokédex

A vanilla JavaScript web app to browse, search, and collect Pokémon using the [PokéAPI](https://pokeapi.co/).

## Features

- Browse a list of Pokémon with images, names, and stats
- Search by name or numeric ID — results shown in a dialog
- Catch Pokémon and save them to your personal Pokédex (via localStorage)
- Add and persist personal notes per Pokémon

## Pages

| File | Description |
|------|-------------|
| `index.html` / `main.js` | Homepage — browse & search Pokémon |
| `pokedex.html` / `pokedex.js` | Pokédex — your caught Pokémon with notes |

## Getting Started

No build step required. Open `index.html` directly in a browser, or use a local dev server:

```bash
# VS Code Live Server extension
# right-click index.html → "Open with Live Server"
```

## Tech Stack

- HTML / CSS / vanilla JavaScript
- [PokéAPI](https://pokeapi.co/) (free, no auth required)
- `localStorage` for persistence

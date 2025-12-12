const l_pokemon = [];
const nb_pokemon_national_dex = 5;
const tbody = document.querySelector("tbody");

async function getPokemonById(id) {
  return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Pokemon was load with numdex equals to: " + data.id);
      return data;
    });
}

async function loadPokemon() {
  for (let i = 1; i <= nb_pokemon_national_dex; i++) {
    l_pokemon[i - 1] = await getPokemonById(i);
  }
  console.log(l_pokemon[0].name);
  console.log(l_pokemon[0].types[0].type.name);
  console.log(l_pokemon[0].cries.latest);
  console.log(l_pokemon[0]);
  console.log(l_pokemon[0].sprites.front_default);
}
loadPokemon();

function extractPokemonData(pokemonData) {
  return {
    nom: pokemonData.name, // ✅ Nom
    id: pokemonData.id, // ✅ ID
    type: pokemonData.types.map((t) => t.type.name), // ✅ Type(s)
    cries: pokemonData.cries.latest, // ✅ Cri
    photo: pokemonData.sprites.front_default, // ✅ Photo
  };
}

function createPokemonHTML(pokemon) {
  return `
    <tr>
        <td>${pokemon.id}</td>                    
        <td>${pokemon.nom}</td>                  
        <td>
            ${pokemon.type.map((type) => `<div>${type}</div>`).join("")}
        </td>
        <td><img src="${pokemon.photo}"           
                alt="pokemon ${pokemon.id}"></td>
        <td><audio controls
        src="${
          pokemon.cries
        }">Votre navigateur ne supporte pas l'audio.</audio></td>
    </tr>`;
}
for (let i = 0; i < nb_pokemon_national_dex; i++) {
  let HTML = createPokemonHTML(extractPokemonData(l_pokemon[i]));
  tbody.innerHTML += HTML;
}

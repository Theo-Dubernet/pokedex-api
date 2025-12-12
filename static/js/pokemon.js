const l_pokemon = [];
const nb_pokemon_national_dex = 100;
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
    let html_extract = extractPokemonData(l_pokemon[i - 1]);
    let html_tbody = createPokemonHTML(html_extract);
    tbody.innerHTML += html_tbody;
  }
}

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
            <div id="types-container">
                ${pokemon.type.map((type) => `<div class="type-${type} types">${type}</div>`).join("")}
            </div>
        </td>
        <td><img src="${pokemon.photo}"           
                alt="pokemon ${pokemon.id}"></td>
        <td><audio controls
        src="${
          pokemon.cries
        }">Votre navigateur ne supporte pas l'audio.</audio></td>
    </tr>`;
}
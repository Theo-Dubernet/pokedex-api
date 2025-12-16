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
                ${pokemon.type
                  .map(
                    (type) => `<div class="type-${type} types">${type}</div>`
                  )
                  .join("")}
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

function displayPokemon(pokemonList) {
  // Vider le tbody
  tbody.innerHTML = "";

  // Si aucun Pokémon trouvé, afficher un message
  if (pokemonList.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 20px; color: #999; font-size: 1.1em;">
          🔍 Aucun Pokémon trouvé
        </td>
      </tr>
    `;
    return;
  }

  // Afficher chaque Pokémon de la liste
  pokemonList.forEach((pokemon) => {
    const html = createPokemonHTML(pokemon);
    tbody.innerHTML += html;
  });

  console.log(`✅ ${pokemonList.length} Pokémon affichés`);
}

// =====================================================
// ✨ FONCTION DE RECHERCHE
// =====================================================
function searchPokemon(searchTerm) {
  // Convertir en minuscules et supprimer les espaces
  const searchLower = searchTerm.toLowerCase().trim();

  // Si la recherche est vide, afficher tous les Pokémon
  if (searchLower === "") {
    displayPokemon(l_pokemon);
    console.log("🔍 Recherche vide → Affichage de tous les Pokémon");
    return;
  }

  // Filtrer les Pokémon par nom
  const filteredPokemon = l_pokemon.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchLower);
  });

  // Afficher les résultats
  displayPokemon(filteredPokemon);

  console.log(
    `🔍 Recherche: "${searchTerm}" → ${filteredPokemon.length} résultat(s)`
  );
}

// =====================================================
// ✨ INITIALISATION DE LA RECHERCHE
// =====================================================
function initSearch() {
  const searchForm = document.querySelector(".poke-search");
  const searchInput = searchForm.querySelector('input[type="search"]');

  // Recherche en temps réel (à chaque caractère tapé)
  searchInput.addEventListener("input", (e) => {
    searchPokemon(e.target.value);
    console.log(e.target.value + "tes bien dans seachInput");
  });

  // Empêcher la soumission du formulaire (rechargement de la page)
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    searchPokemon(searchInput.value);
  });

  console.log("✅ Recherche initialisée");
}

// =====================================================
// LANCEMENT AU CHARGEMENT DE LA PAGE
// =====================================================
document.addEventListener("DOMContentLoaded", async function () {
  // 1. Charge les Pokémon

  initSearch(); // 2. Initialise la recherche
});

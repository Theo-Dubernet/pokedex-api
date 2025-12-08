const l_pokemon = [];
const nb_pokemon_national_dex = 1025;

async function getPokemonById(id){
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log("Pokemon was load with numdex equals to: " + data.id);
            return data;
        });
}

async function loadPokemon() {
    for (let i = 1; i <= nb_pokemon_national_dex; i++) {
        l_pokemon[i] = await getPokemonById(i);
    }
}
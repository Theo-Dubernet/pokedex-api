const l_pokemon = [];
let pokemon_html_tbody = "";
const nb_pokemon_national_dex = 1025;
const tbody = document.querySelector("tbody");

/* Container loading */
const loadingContainer = document.getElementById('container-loading');

/* Set dans le chargeur la valeur max */
const maxValueHTML = document.getElementById('max-value');
maxValueHTML.innerText = nb_pokemon_national_dex;

/* Valeur charger qu'on va update */
const loadedValueHTML = document.getElementById('loaded-value');

async function getPokemonById(id) {
    return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => {
            loadedValueHTML.innerText = data.id;
            if (loadedValueHTML.innerText === maxValueHTML.innerText) {
                loadingContainer.style.display = "none";
            }
            return data;
        });
}

async function loadPokemon() {
    for (let i = 1; i <= nb_pokemon_national_dex; i++) {
        l_pokemon[i - 1] = await getPokemonById(i);
        let html_extract = extractPokemonData(l_pokemon[i - 1]);
        let html_tbody = createPokemonHTML(html_extract);
        pokemon_html_tbody += html_tbody;
    }

    setTimeout(() => {
        const allBtnAudio = document.getElementsByClassName("audio-btn");
        for (let i = 0; i < allBtnAudio.length; i++) {
            allBtnAudio[i].addEventListener("click", changeButtonToAudio);
        }
    } , 50);


    tbody.innerHTML = pokemon_html_tbody;

    return true;
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

function changeAudioToButton(audio) {
    const button = document.createElement("button");
    button.className = "audio-btn";
    button.textContent = "Appuyer pour entendre";
    button.dataset.src = audio.src;

    button.addEventListener("click", changeButtonToAudio);

    audio.replaceWith(button);
}

function changeButtonToAudio(e) {
    const button = e.currentTarget;

    // 1️⃣ Transformer TOUS les audios en boutons
    document.querySelectorAll("audio").forEach(audio => {
        changeAudioToButton(audio);
    });

    // 2️⃣ Transformer le bouton cliqué en audio
    const audio = document.createElement("audio");
    audio.src = button.dataset.src;
    audio.controls = true;
    audio.autoplay = true;

    button.replaceWith(audio);
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
        <td><button class="audio-btn"
            data-src="${pokemon.cries}">
            Appuyer pour entendre
        </button></td>
    </tr>`;
}
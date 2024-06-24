document.addEventListener('DOMContentLoaded', function() {
    fetchAllPokemon();
});
document.getElementById('pokemonSearch').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query.length > 0) {
        filterPokemonSuggestions(query);
    } else {
       displayAllPokemon(pokemonData);
    }
});
document.getElementById('generateButton').addEventListener('click', function() {
    const pokemonName = document.getElementById('pokemonSearch').value.toLowerCase();
    if (pokemonName) {
        fetchPokemonDetails(pokemonName);
    } else {
        document.getElementById('pokemonDetails').innerHTML = '<p>Please enter a Pokémon name.</p>';
    }
});
let pokemonData = [];
function fetchAllPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`)
        .then(response => response.json())
        .then(data => {
            pokemonData = data.results;
            displayAllPokemon(pokemonData);
        })
        .catch(error => {
            console.error('Error fetching Pokémon data:', error);
        });
}
function displayAllPokemon(pokemonList) {
    clearSuggestions();
    const autocompleteList = document.getElementById('listOfPokeMon');
    pokemonList.forEach(pokemon => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = pokemon.name;
        suggestionItem.addEventListener('click', function() {
            document.getElementById('pokemonSearch').value = pokemon.name;
            clearSuggestions();
        });
        autocompleteList.appendChild(suggestionItem);
    });
}
function filterPokemonSuggestions(query) {
    const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.startsWith(query));
    displayAllPokemon(filteredPokemon);
}
function clearSuggestions() {
    document.getElementById('listOfPokeMon').innerHTML = '';
}
function fetchPokemonDetails(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonDetails(data);
        })
        .catch(error => {
            document.getElementById('pokemonDetails').innerHTML = `<p>${error.message}</p>`;
        });
}
function displayPokemonDetails(data) {
    const detailsDiv = document.getElementById('pokemonDetails');
    detailsDiv.innerHTML = `
        <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>Height: ${data.height}</p>
        <p>Weight: ${data.weight}</p>
        <p>Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
    `;
}
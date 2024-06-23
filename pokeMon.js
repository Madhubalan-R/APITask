// Fetch Pokémon data from an API (e.g., PokéAPI)
// Display details when a card is clicked

const pokemonCards = document.querySelectorAll('.pokemon-card');

pokemonCards.forEach((card) => {
    card.addEventListener('click', async () => {
        const pokemonName = card.textContent.toLowerCase();
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            
            // Extract relevant data (e.g., name, image, abilities)
            const { name, sprites, abilities } = data;
            
            // Display Pokémon details in the main section
            const mainSection = document.querySelector('.pokemon-details');
            mainSection.innerHTML = `
                <h1>${name}</h1>
                <img src="${sprites.front_default}" alt="${name}">
                <h2>Abilities:</h2>
                <ul>
                    ${abilities.map((ability) => `<li>${ability.ability.name}</li>`).join('')}
                </ul>
            `;
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    });
});

window.onload = function() {
    console.log("Pokemon script loaded successfully");
    
    class Pokemon {
        constructor(name, type, img, abilities = {}) {
            this.name = name;
            this.type = type;
            this.img = img;
            this.abilities = abilities;
        }

        initialize() {
            console.log(`Initializing: ${this.name}, type: ${this.type}`);
            console.log("moves:", this.abilities.normal, "&", this.abilities.special);
        }
    }

    class PokedexController {
        constructor() {
            this.pokemonArray = [];
        }

        async fetchPokemonData() {
            const baseUrl = "https://pokeapi.co/api/v2";
            const pokemonListUrl = `${baseUrl}/pokemon?limit=151`;

            try {
                const response = await fetch(pokemonListUrl);
                const data = await response.json();

                const pokemonDetails = await Promise.all(
                    data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
                );

                return pokemonDetails;
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
                return [];
            }
        }

        storePokemonData(pokemonDetails) {
            this.pokemonArray = pokemonDetails.map(details => {
                const name = details.name;
                const type = details.types.map(t => t.type.name).join(", ");
                const img = details.sprites.front_default;
                const abilities = details.abilities.map(a => a.ability.name);

                return new Pokemon(name, type, img, abilities);
            });

         //   console.log("Stored Pokémon:", this.pokemonArray);
        }

        renderPokemon() {
            const pokemonSelectElement = document.getElementById("pokemonSelect");

            if (!pokemonSelectElement) {
                console.error("Element with ID #pokemonSelect not found.");
                return;
            }

            this.pokemonArray.forEach(pokemon => {
                const li = document.createElement("li");
                const img = document.createElement("img");
                img.src = pokemon.img;
                img.alt = pokemon.name;

                img.addEventListener("click", () => {
                    this.addToBottomRightBox(pokemon.img);
                });

                li.appendChild(img);
                pokemonSelectElement.appendChild(li);
            });
        }

        async addToBottomRightBox(imgSrc) {
            // Fetch the index.html to get the #pokemonBox
            try {
                const response = await fetch('../index.html');  // Adjust path if needed
                const html = await response.text();

                // Parse the fetched HTML and extract the #pokemonBox element
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const pokemonBox = doc.getElementById('pokemonBox');

                if (pokemonBox) {
                    // If we found the #pokemonBox, append it to the current page
                    const pokemonBoxContainer = document.getElementById('pokemonBoxContainer');
                    pokemonBoxContainer.innerHTML = ''; // Clear existing content
                    pokemonBoxContainer.appendChild(pokemonBox);

                    // Create an image to append
                    const img = document.createElement("img");
                    img.src = imgSrc;
                    pokemonBox.innerHTML = '';  // Clear any existing image
                    pokemonBox.appendChild(img);
                } else {
                    console.error('Error: #pokemonBox not found in index.html.');
                }
            } catch (error) {
                console.error('Error fetching index.html:', error);
            }
        }

        async initialize() {
            const pokemonDetails = await this.fetchPokemonData();
            this.storePokemonData(pokemonDetails);
            this.renderPokemon();
        }
    }

    const controller = new PokedexController();
    controller.initialize();
};

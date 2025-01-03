// this code is imported into ../scripts/main.js and renders all UI to the #sectionPortfolio
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
    }

    renderPokemon() {
        

        if (!leftDiv) {
            console.error("Element with ID #pokemonSelect not found.");
                return;
        }
        leftDiv.innerHTML = ''
        this.pokemonArray.forEach(pokemon => {
            const li = document.createElement("li");
            const img = document.createElement("img");
            img.src = pokemon.img;
            img.alt = pokemon.name;
            img.draggable = true;  // Make the Pokémon image draggable

            // Handle the start of the drag event
            img.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text", event.target.src);  // Store the image source
                });

           li.appendChild(img);
           leftDiv.appendChild(li);  
        });
    }

    setupDropArea() {
       
       
        // Ensure the drop area is set up correctly
        if (!rightDiv) {
            console.error("Element with ID #pokemonBoxContainer not found.");
            return;
        }
        rightDiv.innerHTML = ''
       
        //adding background img to container
        rightDiv.style.backgroundImage = "url(../media/pokemon_farrm.jpeg)"
        rightDiv.style.backgroundSize = "cover"; // Optional: makes the image cover the entire div
        rightDiv.style.backgroundPosition = "center";
        rightDiv.style.width = "100%";
        rightDiv.style.height = "400px";

        // Allow the drop target to accept dragged items
        rightDiv.addEventListener("dragover", (event) => {
            event.preventDefault(); // Allow the drop
        });

        rightDiv.addEventListener("drop", (event) => {
            event.preventDefault();
            const imgSrc = event.dataTransfer.getData("text"); // Get the dragged image source

            // Create a new image element for the dropped Pokémon
            const img = document.createElement("img");
            img.src = imgSrc;
            img.style.width = "100px";  // Set the size of the dropped image
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.position = "absolute";

            // Randomize the position of the image within the container
            const containerWidth = rightDiv.offsetWidth;
            const containerHeight = rightDiv.offsetHeight;
            const randomX = Math.floor(Math.random() * (containerWidth - 100)); // Random X position (considering the width of the image)
            const randomY = Math.floor(Math.random() * (containerHeight - 100)); // Random Y position (considering the height of the image)

            img.style.left = `${randomX}px`;
            img.style.top = `${randomY}px`;

            // Append the image to the container
            rightDiv.appendChild(img);
            });
    }

    async initialize() {
        const pokemonDetails = await this.fetchPokemonData();
        this.storePokemonData(pokemonDetails);
        this.renderPokemon();
        this.setupDropArea(); // Setup the drop area after rendering Pokémon
    }
}

function initializePokemon(){
    console.log('fetching pokemon content')
    const leftDiv = document.getElementById("leftDiv");
    const rightDiv = document.getElementById("rightDiv");
    const controller = new PokedexController(leftDiv, rightDiv);
    controller.initialize();

}


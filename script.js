
const elements = [
    "Normal", "Fire", "Water", "Grass", "Electric",
    "Ice", "Fighting", "Poison", "Ground", "Flying",
    "Psychic", "Bug", "Rock", "Ghost", "Dragon",
    "Dark", "Steel", "Fairy", "Light", "Shadow",
    "Crystal", "Metal", "Sound", "Wind", "Lava",
    "Magma", "Steam", "Sand", "Nature", "Wood",
    "Blood", "Soul", "Time", "Space", "Gravity",
    "Chaos", "Order", "Cosmic", "Void", "Plasma",
    "Mystic", "Ancient", "Abyss", "Divine", "Holy",
    "Demonic", "Dream", "Nightmare", "Energy", "Unknown"
];

// DATABASE POKEMON
const pokemonData = [
    {
        id: 1,
        name: "Larcera",
        stage: "Stage 1",
        elements: ["Light", "Dark"],
        rank: "Ancient",
        origin: "The Ancient Larceus",
        description: "Pokémon purba yang memiliki potensi evolusi menuju dua kekuatan berbeda.",
        evolution: ["Larcevance", "Larcuvareus"],
        evolutionMethod: "Story Evolution",
        lore: "Larcera memiliki dua jalur evolusi. Cahaya melahirkan Larcevance, sedangkan Kegelapan melahirkan Larcuvareus.",
        sprite: "✨"
    },
    {
        id: 2,
        name: "Larcevance",
        stage: "Stage 2",
        elements: ["Light"],
        rank: "Ancient",
        origin: "Evolution of Larcera",
        description: "Evolusi Larcera yang mewarisi kekuatan Cahaya.",
        evolution: [],
        evolutionMethod: "Final Evolution",
        lore: "Salah satu hasil evolusi Larcera melalui jalur Cahaya.",
        sprite: "☀️"
    },
    {
        id: 3,
        name: "Larcuvareus",
        stage: "Stage 2",
        elements: ["Dark"],
        rank: "Ancient",
        origin: "Evolution of Larcera",
        description: "Evolusi Larcera yang mewarisi kekuatan Kegelapan.",
        evolution: [],
        evolutionMethod: "Final Evolution",
        lore: "Salah satu hasil evolusi Larcera melalui jalur Kegelapan.",
        sprite: "🌑"
    },
    {
        id: 4,
        name: "Vractule",
        stage: "Deity",
        elements: ["Omega"],
        rank: "Omega",
        origin: "Ancient Deity Lineage",
        description: "Pokémon dewa yang menjadi leluhur garis keturunan Van.",
        evolution: [],
        evolutionMethod: "Unknown",
        lore: "Vractule memiliki garis keturunan yang meliputi Vanfre, Vanwatr, Vanarth, dan Vanlea.",
        sprite: "🐉"
    },
    {
        id: 5,
        name: "Vantrels",
        stage: "Stage 1",
        elements: ["Unknown"],
        rank: "Normal",
        origin: "Vractule",
        description: "Pokémon tahap pertama dari garis keturunan Vractule.",
        evolution: [],
        evolutionMethod: "Unknown",
        lore: "Vantrels merupakan salah satu keturunan Vractule.",
        sprite: "🐲"
    },
    {
        id: 6,
        name: "Greale",
        stage: "Deity",
        elements: ["Ground", "Grass"],
        rank: "Ancient",
        origin: "The Ancient Larceus",
        description: "Dewa Tanah dan Daun yang diciptakan untuk mendampingi Vractule.",
        evolution: [],
        evolutionMethod: "No Evolution",
        lore: "Greale hanya memiliki satu garis keturunan yang dikenal, yaitu Groles.",
        sprite: "🌿"
    },
    {
        id: 7,
        name: "Groles",
        stage: "Stage 1",
        elements: ["Ground", "Grass"],
        rank: "Normal",
        origin: "Greale",
        description: "Pokémon tahap pertama keturunan Greale.",
        evolution: ["Glearth"],
        evolutionMethod: "Unknown",
        lore: "Groles merupakan penerus garis keturunan Greale.",
        sprite: "🌱"
    },
    {
        id: 8,
        name: "Glearth",
        stage: "Stage 2",
        elements: ["Ground", "Grass"],
        rank: "Normal",
        origin: "Evolution of Groles",
        description: "Evolusi Groles yang menguasai kekuatan Tanah dan Daun.",
        evolution: [],
        evolutionMethod: "Unknown",
        lore: "Glearth merupakan tahap kedua dari garis keturunan Greale.",
        sprite: "🌳"
    }
];

// GENERATE ELEMENT FILTER
const typeFilter = document.getElementById("typeFilter");

elements.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
});

// RENDER DATABASE
const grid = document.getElementById("pokemonGrid");

function renderPokemon(data) {
    grid.innerHTML = "";

    document.getElementById("resultCount").textContent =
        data.length + " Results";

    data.forEach(pokemon => {
        const card = document.createElement("article");
        card.className = "pokemon-card";

        card.innerHTML = `
            <div class="sprite">${pokemon.sprite}</div>
            <small>#${String(pokemon.id).padStart(3, "0")}</small>
            <h3>${pokemon.name}</h3>
            <p>${pokemon.stage}</p>
            <div class="types">
                ${pokemon.elements.map(type =>
                    `<span>${type}</span>`
                ).join("")}
            </div>
            <button class="detail-button">View Entry</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            showDetail(pokemon);
        });

        grid.appendChild(card);
    });
}

// SEARCH AND FILTER
function filterPokemon() {
    const search = document.getElementById("searchInput")
        .value.toLowerCase();

    const type = typeFilter.value;
    const rank = document.getElementById("rankFilter").value;

    const filtered = pokemonData.filter(pokemon => {
        const matchesSearch =
            pokemon.name.toLowerCase().includes(search);

        const matchesType =
            type === "all" || pokemon.elements.includes(type);

        const matchesRank =
            rank === "all" || pokemon.rank === rank;

        return matchesSearch && matchesType && matchesRank;
    });

    renderPokemon(filtered);
}

document.getElementById("searchInput")
    .addEventListener("input", filterPokemon);

typeFilter.addEventListener("change", filterPokemon);

document.getElementById("rankFilter")
    .addEventListener("change", filterPokemon);

// POKEMON DETAIL
function showDetail(pokemon) {
    const detail = document.getElementById("pokemonDetail");
    const section = document.getElementById("detailSection");

    detail.innerHTML = `
        <div class="detail-sprite">${pokemon.sprite}</div>

        <small>POKÉDEX #${String(pokemon.id).padStart(3, "0")}</small>
        <h1>${pokemon.name}</h1>

        <div class="types">
            ${pokemon.elements.map(type =>
                `<span>${type}</span>`
            ).join("")}
        </div>

        <div class="info-box">
            <h3>Basic Information</h3>
            <p><b>Stage:</b> ${pokemon.stage}</p>
            <p><b>Rank:</b> ${pokemon.rank}</p>
            <p><b>Origin:</b> ${pokemon.origin}</p>
        </div>

        <div class="info-box">
            <h3>Description</h3>
            <p>${pokemon.description}</p>
        </div>

        <div class="info-box">
            <h3>Evolution Information</h3>
            <p><b>Method:</b> ${pokemon.evolutionMethod}</p>
            <p><b>Evolution:</b> ${
                pokemon.evolution.length
                    ? pokemon.evolution.join(" / ")
                    : "No recorded evolution"
            }</p>
        </div>

        <div class="info-box">
            <h3>Origin & History</h3>
            <p>${pokemon.lore}</p>
        </div>
    `;

    section.classList.add("active");
    section.scrollIntoView({ behavior: "smooth" });
}

// CLOSE DETAIL
document.getElementById("closeDetail")
    .addEventListener("click", () => {
        document.getElementById("detailSection")
            .classList.remove("active");
    });

// INITIALIZE
document.getElementById("totalPokemon").textContent =
    pokemonData.length;

document.getElementById("totalRegistered").textContent =
    pokemonData.length;

renderPokemon(pokemonData);

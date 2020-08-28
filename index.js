(async (show='https://pokeapi.co/api/v2/pokemon?limit=30') => {
    try {
        const pokemons = await fetch(show)
            .then(response => response.json())
            .then(data => data.results);
    
        for (i in pokemons){
            pokemons[i] = await fetch(pokemons[i].url)
                .then(response => response.json())
                .then(data => data)
        }

        output(pokemons)
        
    } catch (error) {
        console.error(error)
    }
})()


function output(array) {
    const show = array
    .map(pokemon=>`
    <li class="card" data-id=${pokemon.id} >
        <img src=${pokemon.sprites.other["official-artwork"]["front_default"]}>
        <h4>${pokemon.name}</h4>
    </li>
    `)
    .join("")

    document.querySelector('.pokemons').innerHTML += show


    const cards = document.querySelectorAll(".pokemons li")
    for (const card of cards){
        card.addEventListener("click",handlePokemon)
    }
}

function handlePokemon(e){
    [...document.querySelectorAll(".pokemons li")].forEach(card=>{
        card.className = card.className.replace("selected","")
    })
    const cardLi = e.currentTarget
    cardLi.className += " selected"
    showInfo()
}

const showPokemonInfo = document.querySelector(".show-info")

async function showInfo(){
    const pokemonId = document.querySelector(".selected").dataset.id
    const pokemonSelected = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
        .then(response => response.json())
        .then(data => data)
    
    showPokemonInfo.innerHTML = `
        <img src=${pokemonSelected.name}>
        <div class="inf">
            <h4>${pokemonSelected.name}</h4>
            <ul>Tipo
                ${pokemonSelected.name}
            </ul>
            <ul>Habilidades
                ${pokemonSelected.name}
            </ul>
        </div>
    `
}

async function addPokemon() {
    const showNow = document.querySelectorAll(".pokemons .card")
    const inicio = showNow.length
    try {
        const pokemons = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${inicio}&limit=30`)
            .then(response => response.json())
            .then(data => data.results);
    
        for (i in pokemons){
            pokemons[i] = await fetch(pokemons[i].url)
                .then(response => response.json())
                .then(data => data)
        }

        output(pokemons)
        
    } catch (error) {
        console.error(error)
    }
}

const plusButton = document.querySelector("#most-pokemon")
plusButton.addEventListener("click", addPokemon)
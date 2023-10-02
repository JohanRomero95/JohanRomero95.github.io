function toggle() {
     let pokedex = document.querySelector(".pokedex");
     if (pokedex.classList.contains("closed")) {
          pokedex.classList.remove("closed");
     } else {
          pokedex.classList.add("closed");
     }
}

document.getElementById("btn").addEventListener("click", toggle);

let pokedexElements = document.querySelectorAll(".pokedex");
pokedexElements.forEach(function (pokedexElement) {
     pokedexElement.addEventListener("click", toggle);
});

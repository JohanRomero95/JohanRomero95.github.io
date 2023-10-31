const boton = document.querySelector("#btnOpen");
const pokedex = document.querySelector(".pokedex");
const divPokedexPadre = document.querySelector(".pokedex-padre");
const input = document.querySelector(".parpadeando-input");
const pokedexBackground = document.querySelector(".pokedex-pad-background");
const pantalla = document.querySelector(".pantalla-negra");
const URL = "https://pokeapi.co/api/v2/pokemon/";
const listaPokemon = document.querySelector("#listaPokemon");
const botonesBuscador = document.querySelectorAll(".btn-header");
const botonBusqueda = document.getElementById("busqueda-pokemon");
const inputPokemon = document.getElementById("name-pokemon");
const colorOriginal = listaPokemon.style.color;

let haciaAbajo = false;
let haciaLaIzquierda = false;
let encendido = false;
let isOn = false;

boton.addEventListener("click", () => {
  pokedex.classList.toggle("closed");
  isOn = !isOn;

  // Desplazamiento del pokedex
  const transformValue =
    haciaAbajo && haciaLaIzquierda
      ? "translateY(0)"
      : `translate(${-45}px, ${180}px)`;
  divPokedexPadre.style.transform = transformValue;
  haciaAbajo = !haciaAbajo;
  haciaLaIzquierda = !haciaLaIzquierda;

  // Encender/apagar luz verde
  encendido = !encendido;
  pokedexBackground.classList.toggle("on", encendido);

  // Animación de encendido intro
  if (isOn) {
    pantalla.classList.add("shutdown");
    const contenido = "Bienvenido";
    let i = 0;

    const animateText = () => {
      if (i <= contenido.length) {
        agregarLetra();
        i++;
        setTimeout(animateText, 235);
      }
    };

    const agregarLetra = () => {
      pantalla.textContent = contenido.slice(0, i);
    };

    setTimeout(animateText, 1200);
  } else {
    pantalla.classList.remove("shutdown");
    setTimeout(() => {
      pantalla.classList.remove("oculta");
    }, 300);
    listaPokemon.classList.add("oculta");
  }
});

function mostrarPokemon(poke) {
  const tipos = poke.types
    .map((types) => `<p class="${types.type.name} tipo">${types.type.name}</p>`)
    .join("");
  const div = document.createElement("div");
  div.classList.add("card-pokemon");
  div.innerHTML = `
  <div class="card-pokemon-imagen">
    <img src="${poke.sprites.other["official-artwork"].front_default}"
    alt="${poke.name}">
            <div class="card-pokemon-info">
            <h2 class="card-pokemon-nombre">${poke.name}</h2>
            <div class="card-pokemon-tipos">${tipos}</div>
            </div>
            </div>
            `;
  listaPokemon.appendChild(div);
}

function colorOriginalError() {
  listaPokemon.textContent = "Nombre incorrecto o el Pokemon no existe.";
  listaPokemon.style.color = "var(--amarillo-pikachu)";

  inputPokemon.addEventListener("beforeinput", () => {
    listaPokemon.style.color = colorOriginal;
  });
  botonBusqueda.addEventListener("focusout", () => {
    listaPokemon.style.color = colorOriginal;
  });
}

function cargarPokemonDesdeAPI(url) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Pokemon no encontrado.");
  });
}

for (let i = 1; i <= 151; i++) {
  cargarPokemonDesdeAPI(URL + i)
    .then((data) => mostrarPokemon(data))
    .catch((error) => {
      console.error(error);
    });
}

function buscarPokemonPorNombre(nombre) {
  listaPokemon.innerHTML = "";
  listaPokemon.classList.remove("oculta");
  pantalla.classList.add("oculta");
  pantalla.classList.remove("shutdown");

  cargarPokemonDesdeAPI(URL + nombre)
    .then((data) => mostrarPokemon(data))
    .catch(() => {
      colorOriginalError();
    });
}

// Busqueda Dinamica
async function buscarPokemonEnTiempoReal(letra) {
  pantalla.classList.add("oculta");
  listaPokemon.classList.remove("oculta");
  listaPokemon.innerHTML = "";

  if (letra.length === 1) return;

  try {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/?limit=151`;
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const filteredResults = data.results.filter((result) =>
        result.name.includes(letra)
      );

      if (filteredResults.length > 0) {
        for (const result of filteredResults) {
          const pokemonData = await cargarPokemonDesdeAPI(result.url);
          mostrarPokemon(pokemonData);
        }
      } else {
        colorOriginalError();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

// Busqueda por Categoria
botonesBuscador.forEach((boton) => {
  boton.addEventListener("click", async (event) => {
    const botonId = event.currentTarget.id;
    pantalla.classList.remove("shutdown");
    pantalla.classList.add("oculta");
    listaPokemon.classList.remove("oculta");
    listaPokemon.innerHTML = "";

    try {
      // Realiza una solicitud para obtener la lista completa de Pokémon
      const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=151`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        for (const result of data.results) {
          const pokemonData = await cargarPokemonDesdeAPI(result.url);

          if (botonId === "ver-todos") {
            mostrarPokemon(pokemonData);
          } else {
            const tipos = pokemonData.types.map((types) => types.type.name);
            if (tipos.includes(botonId)) {
              mostrarPokemon(pokemonData);
            }
          }
        }
      } else {
        console.log("No se encontraron Pokémon.");
      }
    } catch (error) {
      console.error(error);
    }
  });
});

function realizarBusqueda() {
  const nombrePokemon = inputPokemon.value.toLowerCase().trim();
  buscarPokemonPorNombre(nombrePokemon);
}

botonBusqueda.addEventListener("click", realizarBusqueda);

inputPokemon.addEventListener("keypress", (event) => {
  if (event.key === "Enter" || event.keyCode === 13) {
    realizarBusqueda();
  }
});

inputPokemon.addEventListener("input", () => {
  const query = inputPokemon.value.toLowerCase();
  buscarPokemonEnTiempoReal(query);
});

// Parpadeo del input
input.addEventListener("focus", () => {
  input.style.animation = "none";
});

input.addEventListener("blur", () => {
  input.style.animation = "parpadeo 1s infinite";
});

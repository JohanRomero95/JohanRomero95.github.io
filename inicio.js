const numeroPokemon = 153;
const URL = "https://pokeapi.co/api/v2/pokemon/";
const boton = document.querySelector("#btnOpen");
const pokedex = document.querySelector(".pokedex");
const verTodos = document.querySelector("#ver-todos");
const pokemonDetalles = document.querySelector(".pokemon");
const input = document.querySelector(".parpadeando-input");
const typeButtons = document.querySelectorAll(".btn-header");
const listaPokemon = document.querySelector("#listaPokemon");
const inputPokemon = document.getElementById("name-pokemon");
const colorOriginal = listaPokemon.style.color;
const anteriorPokemonBtn = document.querySelector(".flechaizq");
const siguientePokemonBtn = document.querySelector(".flechader");
const divPokedexPadre = document.querySelector(".pokedex-padre");
const botonesBuscador = document.querySelectorAll(".btn-header");
const botonBusqueda = document.getElementById("busqueda-pokemon");
const notFoundMessage = document.querySelector("#not-found-message");
const pokemonContainer = document.getElementById("pokemonContainer");
const pokedexBackground = document.querySelector(".pokedex-pad-background");
const pantalla = document.querySelector(".pantalla-negra");

let isOn = false;
let currentIndex = null;
let encendido = false;
let todosLosPokemones = [];
let haciaAbajo = false;
let haciaLaIzquierda = false;

// MI PRIMER CODIGO
// function mostrarPokemon(poke) {
//   const tipos = poke.types
//     .map((types) => `<p class="${types.type.name} tipo">${types.type.name}</p>`)
//     .join("");
//   const div = document.createElement("div");
//   div.classList.add("card-pokemon");
//   div.innerHTML = `
//   <div class="card-pokemon-imagen">
//     <img src="${poke.sprites.other["official-artwork"].front_default}"
//     alt="${poke.name}">
//             <div class="card-pokemon-info">
//             <h2 class="card-pokemon-nombre">${poke.name}</h2>
//             <div class="card-pokemon-tipos">${tipos}</div>
//             </div>
//             </div>
//             `;
//   listaPokemon.appendChild(div);
// }

// function colorOriginalError() {
//   listaPokemon.textContent = "Nombre incorrecto o el Pokemon no existe.";
//   listaPokemon.style.color = "var(--amarillo-pikachu)";

//   inputPokemon.addEventListener("beforeinput", () => {
//     listaPokemon.style.color = colorOriginal;
//   });
//   botonBusqueda.addEventListener("focusout", () => {
//     listaPokemon.style.color = colorOriginal;
//   });
// }

// function cargarPokemonDesdeAPI(url) {
//   return fetch(url).then((response) => {
//     if (response.ok) {
//       return response.json();
//     }
//     throw new Error("Pokemon no encontrado.");
//   });
// }

// for (let i = 1; i <= 151; i++) {
//   cargarPokemonDesdeAPI(URL + i)
//     .then((data) => mostrarPokemon(data))
//     .catch((error) => {
//       console.error(error);
//     });
// }

// function buscarPokemonPorNombre(nombre) {
//   listaPokemon.innerHTML = "";
//   listaPokemon.classList.remove("oculta");
//   pantalla.classList.add("oculta");
//   pantalla.classList.remove("shutdown");

//   cargarPokemonDesdeAPI(URL + nombre)
//     .then((data) => mostrarPokemon(data))
//     .catch(() => {
//       colorOriginalError();
//     });
// }

// // Busqueda Dinamica
// async function buscarPokemonEnTiempoReal(letra) {
//   pantalla.classList.add("oculta");
//   listaPokemon.classList.remove("oculta");
//   listaPokemon.innerHTML = "";

//   if (letra.length === 1) return;

//   try {
//     const endpoint = `https://pokeapi.co/api/v2/pokemon/?limit=151`;
//     const response = await fetch(endpoint);
//     const data = await response.json();

//     if (data.results && data.results.length > 0) {
//       const filteredResults = data.results.filter((result) =>
//         result.name.includes(letra)
//       );

//       if (filteredResults.length > 0) {
//         for (const result of filteredResults) {
//           const pokemonData = await cargarPokemonDesdeAPI(result.url);
//           mostrarPokemon(pokemonData);
//         }
//       } else {
//         colorOriginalError();
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Busqueda por Categoria
// botonesBuscador.forEach((boton) => {
//   boton.addEventListener("click", async (event) => {
//     const botonId = event.currentTarget.id;
//     pantalla.classList.remove("shutdown");
//     pantalla.classList.add("oculta");
//     listaPokemon.classList.remove("oculta");
//     listaPokemon.innerHTML = "";

//     try {
//       // Realiza una solicitud para obtener la lista completa de Pokémon
//       const endpoint = `https://pokeapi.co/api/v2/pokemon?limit=151`;
//       const response = await fetch(endpoint);
//       const data = await response.json();

//       if (data.results && data.results.length > 0) {
//         for (const result of data.results) {
//           const pokemonData = await cargarPokemonDesdeAPI(result.url);

//           if (botonId === "ver-todos") {
//             mostrarPokemon(pokemonData);
//           } else {
//             const tipos = pokemonData.types.map((types) => types.type.name);
//             if (tipos.includes(botonId)) {
//               mostrarPokemon(pokemonData);
//             }
//           }
//         }
//       } else {
//         console.log("No se encontraron Pokémon.");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   });
// });

// function realizarBusqueda() {
//   const nombrePokemon = inputPokemon.value.toLowerCase().trim();
//   buscarPokemonPorNombre(nombrePokemon);
// }

// botonBusqueda.addEventListener("click", realizarBusqueda);

// inputPokemon.addEventListener("keypress", (event) => {
//   if (event.key === "Enter" || event.keyCode === 13) {
//     realizarBusqueda();
//   }
// });

// inputPokemon.addEventListener("input", () => {
//   const query = inputPokemon.value.toLowerCase();
//   buscarPokemonEnTiempoReal(query);
// });

/*--------------------------------------------------------------------------------------*/

// MI SEGUNDO CODIGO
//  FETCH PARA MOSTRAR TODOS LOS POKEMONES
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numeroPokemon}`).then(
  (respuesta) =>
    respuesta.json().then((data) => {
      todosLosPokemones = data.results;
      mostrarPokemon(todosLosPokemones);
    })
);

// FUNCION PARA QUE SE SINCRONICE LA API CUANDO SE LE DE CLICK AL POKEMON
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
        response.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return { pokemon, pokemonSpecies };
  } catch (error) {
    return false;
  }
}

// FUNCION PARA VER TODOS LOS POKEMONES Y AL HACER CLICK NOS LLEVE AL DETALLE DEL POKEMON
async function mostrarPokemon(pokemonList) {
  listaPokemon.innerHTML = "";
  pokemonList.forEach(async (poke) => {
    const pokemonName = poke.url.split("/")[6];
    const { pokemon } = await fetchPokemonDataBeforeRedirect(poke.name);
    const divPokemon = document.createElement("div");
    divPokemon.classList.add("card-pokemon");
    divPokemon.innerHTML = `<div class="card-pokemon-imagen">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName}.png" alt="${pokemonName}"/>
        <div class="card-pokemon-info">
        <h2 class="card-pokemon-nombre">${poke.name}</h2>
                     <div class="pokemon-tipos"></div>
                     <p class="${pokemon.types[0].type.name} tipo">${
                       pokemon.types[0].type.name
                     }</p>
                  ${
                    pokemon.types.length === 2
                      ? `<p class="${pokemon.types[1].type.name} tipo">${pokemon.types[1].type.name}</p>`
                      : ""
                  }
         </div>
        </div>
            `;

    // AQUI NOS DIRIGE AL DETALLE
    divPokemon.addEventListener("click", async () => {
      const exitoso = await fetchPokemonDataBeforeRedirect(poke.name);

      if (exitoso) {
        let tipos = "";
        const { pokemon } = exitoso;
        const pTipo = document.createElement("p");
        pTipo.classList.add("tipo");

        if (pokemonDetalles) {
          pantalla.classList.add("oculta");
          listaPokemon.classList.add("oculta");
          pokemonDetalles.classList.remove("oculta");
          pokemonDetalles.innerHTML = `<div class="pokemon-imagen">
                    <p class="pokemon-id-back">#${pokemon.id}</p>
                    <div class="info-pokemon">
                      <h2 class="pokemon-nombre">${pokemon.name}</h2>
                    </div>
                    <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonName}.png"
                  alt="${pokemon.name}">
                <div class="pokemon-tipos">
                  <p class="${pokemon.types[0].type.name} tipo">${
                    pokemon.types[0].type.name
                  }</p>
                  ${
                    pokemon.types.length === 2
                      ? `<p class="${pokemon.types[1].type.name} tipo">${pokemon.types[1].type.name}</p>`
                      : ""
                  }
                </div>
              </div>
                  <div class="pokemon-info">
                    <div class="nombre-contenedor">
                    </div>
                    <div class="pokemon-stats">
                      <div class="modif-stat">
                        <p class="stat-text">Tamaño</p>
                        <p class="stat">${pokemon.height}m</p>
                      </div>
                      <div class="modif-stat">
                        <p class="stat-text">Peso</p>
                        <p class="stat">${pokemon.weight}kg</p>
                      </div>
                    </div>
                    <div class="stats-pokemon">
                      <div class="stat-group">
                        <span>HP</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[0].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Atk</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[1].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Dfs</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[2].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Sp.A</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[3].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Sp.D</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[4].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Speed</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[5].base_stat
                        }</span>
                      </div>
                    </div>
                  </div>`;

          const progressBarList =
            pokemonDetalles.querySelectorAll(".progress-bar");

          // BARRAS DE ESTADISTICAS
          progressBarList.forEach((progressBar, index) => {
            const progressValue = pokemon.stats[index].base_stat;
            let height = 100 - progressValue;
            if (progressValue > 100) {
              height = 0;
            }
            progressBar.style.top = `${height}%`;
          });
        }
        pTipo.textContent = tipos;
      }
    });
    listaPokemon.appendChild(divPokemon);
  });
}

// FUNCION PARA BUSQUEDA DINAMICA
function manejarBusqueda() {
  const terminosDeBusqueda = inputPokemon.value.toLowerCase().trim();
  let filtrarPokemon;

  if (terminosDeBusqueda.length >= 1) {
    filtrarPokemon = todosLosPokemones.filter((pokemon) => {
      return pokemon.name.toLowerCase().startsWith(terminosDeBusqueda);
    });
  } else {
    filtrarPokemon = todosLosPokemones;
  }

  mostrarPokemon(filtrarPokemon);

  // ERROR DEL NOMBRE POKEMON
  if (filtrarPokemon.length === 0) {
    listaPokemon.textContent = "Nombre incorrecto o el Pokemon no existe.";
    listaPokemon.style.color = "var(--amarillo-pikachu)";
  } else {
    listaPokemon.style.color = colorOriginal;
  }
}

async function fetchPokemonByType(type) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    const { pokemon } = await response.json();
    const pokemonList = pokemon.map((entry) => entry.pokemon);
    return pokemonList;
  } catch (error) {
    return [];
  }
}

// FUNCION PARA MOSTRAR LOS DETALLES DE UN POKEMON
async function mostrarDetallesPokemon(nombrePokemon) {
  const { pokemon } = await fetchPokemonDataBeforeRedirect(nombrePokemon);

  pantalla.classList.add("oculta");
  listaPokemon.classList.add("oculta");

  if (pokemonDetalles) {
    pokemonDetalles.classList.remove("oculta");
    pokemonDetalles.innerHTML = `
      <div class="pokemon-imagen">
        <p class="pokemon-id-back">#${pokemon.id}</p>
        <div class="info-pokemon">
          <h2 class="pokemon-nombre">${pokemon.name}</h2>
        </div>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
          pokemon.id
        }.png" alt="${pokemon.name}">
        <div class="pokemon-tipos">
          <p class="${pokemon.types[0].type.name} tipo">${
            pokemon.types[0].type.name
          }</p>
          ${
            pokemon.types.length === 2
              ? `<p class="${pokemon.types[1].type.name} tipo">${pokemon.types[1].type.name}</p>`
              : ""
          }
        </div>
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor"></div>
        <div class="pokemon-stats">
          <div class="modif-stat">
            <p class="stat-text">Tamaño</p>
            <p class="stat">${pokemon.height}m</p>
          </div>
          <div class="modif-stat">
            <p class="stat-text">Peso</p>
            <p class="stat">${pokemon.weight}kg</p>
          </div>
        </div>
        <div class="stats-pokemon">
                      <div class="stat-group">
                        <span>HP</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[0].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Atk</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[1].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Dfs</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[2].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Sp.A</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[3].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Sp.D</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[4].base_stat
                        }</span>
                      </div>
                      <div class="stat-group">
                        <span>Speed</span>
                        <div class="progress-bar"></div>
                        <span class="counter-stat">${
                          pokemon.stats[5].base_stat
                        }</span>
                      </div>
                    </div>
                  </div>`;

    const progressBarList = pokemonDetalles.querySelectorAll(".progress-bar");

    progressBarList.forEach((progressBar, index) => {
      const progressValue = pokemon.stats[index].base_stat;
      let height = 100 - progressValue;
      if (progressValue > 100) {
        height = 0;
      }
      progressBar.style.top = `${height}%`;
    });
  }
}

// FUNCION PARA MOSTRAR POKEMON POR TIPO
typeButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const type = event.currentTarget.id;
    const pokemonList = await fetchPokemonByType(type);
    const cantidadDePokemones = 21;

    listaPokemon.innerHTML = "";
    pantalla.classList.add("oculta");
    pokemonDetalles.classList.add("oculta");
    listaPokemon.classList.remove("oculta");

    for (let i = 0; i < cantidadDePokemones && i < pokemonList.length; i++) {
      const pokemon = pokemonList[i];
      const { pokemon: detallePokemon } = await fetchPokemonDataBeforeRedirect(
        pokemon.url.split("/").slice(-2, -1)[0]
      );

      const divPokemon = document.createElement("div");
      divPokemon.classList.add("card-pokemon");
      divPokemon.innerHTML = `
        <div class="card-pokemon-imagen">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            detallePokemon.id
          }.png" alt="${detallePokemon.name}"/>
          <div class="card-pokemon-info">
            <h2 class="card-pokemon-nombre">${detallePokemon.name}</h2>
            <div class="pokemon-tipos"></div>
            <p class="${detallePokemon.types[0].type.name} tipo">${
              detallePokemon.types[0].type.name
            }</p>
            ${
              detallePokemon.types.length === 2
                ? `<p class="${detallePokemon.types[1].type.name} tipo">${detallePokemon.types[1].type.name}</p>`
                : ""
            }
          </div>
        </div>
      `;

      divPokemon.addEventListener("click", async () => {
        pokemonDetalles.classList.remove("oculta");
        listaPokemon.classList.add("oculta");

        await mostrarDetallesPokemon(detallePokemon.name);
      });

      listaPokemon.appendChild(divPokemon);
    }
  });
});

//  FUNCIONES PARA PASAR POKEMON CON LAS FLECHAS
async function mostrarPokemonPorId(id) {
  const pokemonIndex = todosLosPokemones.findIndex(
    (pokemon) => pokemon.id === id
  );

  if (pokemonIndex !== -1) {
    currentIndex = pokemonIndex;
    await mostrarDetallesPokemon(todosLosPokemones[currentIndex].name);
  }
}

async function mostrarSiguientePokemon() {
  if (currentIndex < todosLosPokemones.length - 1) {
    currentIndex++;
    await mostrarDetallesPokemon(todosLosPokemones[currentIndex].name);
  }
}

async function mostrarPokemonAnterior() {
  if (currentIndex > 0) {
    currentIndex--;
    await mostrarDetallesPokemon(todosLosPokemones[currentIndex].name);
  }
}

verTodos.addEventListener("click", () => {
  listaPokemon.innerHTML = "";
  pantalla.classList.add("oculta");
  pokemonDetalles.classList.add("oculta");
  listaPokemon.classList.remove("oculta");

  mostrarPokemon(todosLosPokemones);
});

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

input.addEventListener("focus", () => {
  input.style.animation = "none";
});

input.addEventListener("blur", () => {
  input.style.animation = "parpadeo 1s infinite";
});

input.addEventListener("click", () => {
  pokemonDetalles.classList.add("oculta");
  listaPokemon.classList.remove("oculta");
});

inputPokemon.addEventListener("click", () => {
  pantalla.classList.add("oculta");
  listaPokemon.classList.remove("oculta");
});

inputPokemon.addEventListener("keyup", manejarBusqueda);

siguientePokemonBtn.addEventListener("click", mostrarSiguientePokemon);

anteriorPokemonBtn.addEventListener("click", mostrarPokemonAnterior);



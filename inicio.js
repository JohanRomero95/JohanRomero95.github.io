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
const todosLosPokemon = document.querySelector(".todos-los-pokemones");
const resultados = document.getElementById("resultados");

let haciaAbajo = false;
let haciaLaIzquierda = false;
let encendido = false;
let isOn = true;

boton.addEventListener("click", () => {
  pokedex.classList.toggle("closed");

  // Desplazamiento
  if (haciaAbajo && haciaLaIzquierda) {
    divPokedexPadre.style.transform = "translateY(0)";
  } else {
    divPokedexPadre.style.transform = `translate(${-45}px, ${180}px)`;
  }
  haciaAbajo = !haciaAbajo;
  haciaLaIzquierda = !haciaLaIzquierda;

  // Encender/apagar
  encendido = !encendido;
  pokedexBackground.classList.toggle("on", encendido);

  // Animación de encendido
  if (isOn) {
    pantalla.classList.add("shutdown");
    const contenido = "Bienvenido";
    let i = 0;
    const agregarLetra = (i) => {
      pantalla.textContent = contenido.slice(0, i);
    };
    setTimeout(() => {
      const animateText = () => {
        if (i <= contenido.length) {
          agregarLetra(i);
          i++;
          setTimeout(animateText, 235);
        }
      };
      animateText();
    }, 1200);
  } else {
    pantalla.classList.remove("shutdown");
    setTimeout(() => {
      pantalla.classList.remove("oculta");
    }, 300);
    listaPokemon.classList.add("oculta");
  }

  isOn = !isOn;
});

input.addEventListener("focus", () => {
  input.style.animation = "none";
});

input.addEventListener("blur", () => {
  input.style.animation = "parpadeo 1s infinite";
});

// Función para mostrar Pokemon en la lista
function mostrarPokemon(poke) {
  let tipos = poke.types
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
  listaPokemon.append(div);
}

/* Se inicia la lista */
for (let i = 1; i <= 151; i++) {
  fetch(URL + i)
    .then((response) => response.json())
    .then((data) => mostrarPokemon(data));
}

botonesBuscador.forEach((boton) =>
  boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    pantalla.classList.remove("shutdown");
    pantalla.classList.add("oculta");
    todosLosPokemon.classList.remove("oculta");
    //
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
      fetch(URL + i)
        .then((response) => response.json())
        .then((data) => {
          if (botonId === "ver-todos") {
            mostrarPokemon(data);
          } else {
            const tipos = data.types.map((types) => types.type.name);
            if (tipos.includes(botonId)) {
              mostrarPokemon(data);
            }
          }
        });
    }
  })
);

botonBusqueda.addEventListener("click", () => {
  const nombrePokemon = inputPokemon.value.toLowerCase().trim();
  listaPokemon.innerHTML = "";
  todosLosPokemon.classList.remove("oculta");
  pantalla.classList.add("oculta");
  pantalla.classList.remove("shutdown");

  fetch(URL + nombrePokemon)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Pokemon no encontrado.");
    })
    .then((data) => {
      mostrarPokemon(data);
    })
    .catch(() => {
      const colorOriginal = listaPokemon.style.color;
      listaPokemon.textContent = "Nombre incorrecto o el Pokemon no existe.";
      listaPokemon.style.color = " var(--amarillo-pikachu)";

      botonBusqueda.addEventListener("focusout", () => {
        listaPokemon.style.color = colorOriginal;
      });
    });

  input.value = ". . .";
});

// inputPokemon.addEventListener("keyup", (e) => {
//   const key = e.target.value;
//   for (let i = 1; i <= 151; i++) {
//     fetch(URL + i)
//       .then((response) => response.json())
//       .then((data) => {
//         if (key.length > 2 && key) {
//           console.log(data.name);
//         }
//       });
//   }
// });

const autocompleteResults = document.getElementById("autocompleteResults");

// Función para buscar y mostrar resultados en tiempo real.
async function searchPokemon(letra) {
  autocompleteResults.innerHTML = ""; // Limpia resultados anteriores.
  if (letra.length < 2) return; // No hagas la solicitud si no hay entrada.

  for (let i = 1; i <= 151; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      if (!response.ok) {
        throw new Error("No se encontraron resultados.");
      }
      const data = await response.json();
      const name = data.name;
      if (name.includes(letra)) {
        const div = document.createElement("div");
        div.classList.add("card-pokemon");
        div.innerHTML = `
            <div class="card-pokemon-imagen">
                <img src="${data.sprites.other["official-artwork"].front_default}"
                    alt="${data.name}">
                <div class="card-pokemon-info">
                    <h2 class="card-pokemon-nombre">${data.name}</h2>
                    <div class="card-pokemon-tipos">hey</div>
                </div>
            </div>
        `;
        autocompleteResults.appendChild(div);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

// Escucha el evento "input" para buscar a medida que el usuario escribe.
inputPokemon.addEventListener("input", () => {
  const query = inputPokemon.value.toLowerCase();
  searchPokemon(query);
});

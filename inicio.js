/* eslint-disable no-undef */
// Apertura Pokedex
const boton = document.querySelector("#btnOpen");
const pokedex = document.querySelector(".pokedex");

boton.addEventListener("click", () => {
     pokedex.classList.toggle("closed");
});

// Desplazamiento pokedex hacia abajo y a la izquierda
let haciaAbajo = false;
let haciaLaIzquierda = false;

boton.addEventListener("click", () => {
     const div = document.querySelector(".pokedex-padre");
     if (haciaAbajo && haciaLaIzquierda) {
          // Si ya se ha movido hacia abajo, restaura la posición original
          div.style.transform = "translateY(0)";
     } else {
          div.style.transform = `translate(${-45}px, ${180}px)`;
     }
     // Cambia el estado de "movidoAbajo" al valor opuesto
     haciaAbajo = !haciaAbajo;
     haciaLaIzquierda = !haciaLaIzquierda;
});

// Parpadeo input
const input = document.querySelector(".parpadeando-input");
input.addEventListener("focus", () => {
     input.style.animation = "none"; // Detiene la animación cuando seleccionan el input
});

input.addEventListener("blur", () => {
     input.style.animation = "parpadeo 1s infinite"; // Reanuda la animación cuando salen del input
});

const pokedexBackground = document.querySelector(".pokedex-pad-background");
let encendido = false;

boton.addEventListener("click", function () {
     encendido = !encendido;
     pokedexBackground.classList.toggle("on", encendido);
});

const element = document.querySelector(".pantalla-negra");
let isOn = true;

// Cuando abre hace animacion de encendido + agrega letra x letra
boton.addEventListener("click", () => {
     if (isOn) {
          element.classList.add("shutdown");
          const pantalla = document.querySelector(".pantalla-negra");
          const contenido = (pantalla.innerHTMLtextContent = "Bienvenido");

          // Letra 1 x 1

          let i = 0;

          agregarLetra = (i) => {
               pantalla.textContent = contenido.slice(0, i);
          };

          setTimeout(() => {
               animateText = () => {
                    if (i <= contenido.length) {
                         agregarLetra(i);
                         i++;
                         setTimeout(animateText, 235);
                    }
               };
               animateText();
          }, 1200);
     } else {
          element.classList.remove("shutdown");
     }
     isOn = !isOn; // Alternar el estado
});

// Llamado de Api Pokemon
const URL = "https://pokeapi.co/api/v2/pokemon/";

// Bucle para que llame por numero la pag
for (let i = 1; i <= 151; i++) {
     fetch(URL + i)
          .then((response) => response.json())
          .then((data) => mostrarPokemon(data));
}

const listaPokemon = document.querySelector("#listaPokemon");
const botonesBuscador = document.querySelectorAll(".btn-header");

function mostrarPokemon(poke) {
     // Para que nos muestre los tipos de pokemons, dependiendo si tiene 1 o mas
     let tipos = poke.types.map(
          (types) => `<p class="${types.type.name} tipo">${types.type.name}</p>`
     );
     tipos = tipos.join("");

     const div = document.createElement("div");
     div.classList.add("card-pokemon");
     div.innerHTML = `
    <div class="card-pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}"
            alt="${poke.name}">
        <div class="card-pokemon-info">
            <div class="card-nombre-contenedor">
                <!-- <p class="pokemon-id">#${poke.id}</p> -->
                <h2 class="card-pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="card-pokemon-tipos">
               ${tipos}
            </div>
        </div>
    </div>
</div>`;
     listaPokemon.append(div);
}

botonesBuscador.forEach((boton) =>
     boton.addEventListener("click", (event) => {
          const botonId = event.currentTarget.id;

          listaPokemon.innerHTML = "";

          for (let i = 1; i <= 151; i++) {
               fetch(URL + i)
                    .then((response) => response.json())
                    .then((data) => {
                         if (botonId === "ver-todos") {
                              mostrarPokemon(data);
                         } else {
                              const tipos = data.types.map(
                                   (types) => types.type.name
                              );
                              if (
                                   tipos.some((tipos) =>
                                        tipos.includes(botonId)
                                   )
                              ) {
                                   mostrarPokemon(data);
                              }
                         }
                    });
          }
     })
);

const botonBusqueda = document.getElementById("busqueda-pokemon");
const inputPokemon = document.getElementById("name-pokemon");

botonBusqueda.addEventListener("click", (poke) => {
     const nombrePokemon = inputPokemon.value;

     if (nombrePokemon === poke.name) {
          console.log("Esta funcionando");
     } else {
          console.log("Te confundiste de nombre");
     }
});

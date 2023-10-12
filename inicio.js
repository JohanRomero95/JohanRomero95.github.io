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

// Letra 1 x 1
boton.addEventListener("click", () => {
     const contenido = "Bienvenido";
     const textElement = document.getElementById("text");

     setText = (indice) => {
          textElement.textContent = contenido.slice(0, indice);
     };

     let i = 0;

     animateText = () => {
          if (i <= contenido.length) {
               setText(i);
               i++;
               setTimeout(animateText, 235);
          }
     };
     animateText();
});

const pokedexBackground = document.querySelector(".pokedex-pad-background");
let encendido = false;

boton.addEventListener("click", function () {
     encendido = !encendido;
     pokedexBackground.classList.toggle("on", encendido);
});

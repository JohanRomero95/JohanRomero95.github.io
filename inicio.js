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

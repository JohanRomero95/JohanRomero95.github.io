const boton = document.querySelector("#btn");
const pokedex = document.querySelector(".pokedex");

boton.addEventListener("click", () => {
     pokedex.classList.toggle("closed");
});

let haciaAbajo = false;

boton.addEventListener("click", () => {
     const div = document.querySelector(".pokedex-padre");
     if (haciaAbajo) {
          // Si ya se ha movido hacia abajo, restaura la posición original
          div.style.transform = "translateY(0)";
     } else {
          // Calcula la altura a la que quieres mover el div hacia abajo
          const nuevaAltura = div.clientHeight;
          // Aplica la transformación CSS para mover el div hacia abajo
          div.style.transform = `translateY(${200}px)`;
     }
     // Cambia el estado de "movidoAbajo" al valor opuesto
     haciaAbajo = !haciaAbajo;
});

const input = document.querySelector(".parpadeando-input");
input.addEventListener("focus", () => {
     input.style.animation = "none"; // Detiene la animación cuando el input recibe el enfoque
});

input.addEventListener("blur", () => {
     input.style.animation = "parpadeo 1s infinite"; // Reanuda la animación cuando el input pierde el enfoque
});

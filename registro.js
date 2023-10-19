// Expresiones regulares para validar el formulario de registro
const nombreRegex = /^[a-zA-Z ]{2,30}$/;
const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const registro = document.querySelector("#registroForm");
const modal = document.querySelector(".modal");
const botonCerrarModal = document.querySelector(".modal__close");
const toast = document.querySelector(".toast");

// Función para mostrar el modal
function mostrarModal() {
     modal.classList.add("modal--show");

     setTimeout(() => {
          window.location.href = "login.html";
     }, 10000);
}

// Funcion cerrar modal
botonCerrarModal.addEventListener("click", (e) => {
     e.preventDefault();
     window.location.href = "login.html";
});

// Agregar un evento de click al botón de registro
registro.addEventListener("submit", (e) => {
     e.preventDefault();

     // Obtener valores de los campos del formulario
     const nombre = document.getElementById("nombre").value;
     const correo = document.getElementById("correo").value;
     const contrasena = document.getElementById("contrasena").value;

     // Guardando en base de datos local
     const Users = JSON.parse(localStorage.getItem("usuario")) || [];
     const isUsersRegistered = Users.find((user) => user.correo === correo);
     if (isUsersRegistered) {
          const toast = document.querySelector(".toast");
          toast.textContent = "Usuario registrado, intenta con otro correo";
          toast.classList.add("toast--show");
          setTimeout(() => {
               toast.classList.remove("toast--show");
          }, 4000);
          return;
     }
     Users.push({
          nombre: nombre,
          correo: correo,
          contrasena: contrasena,
     });
     localStorage.setItem("usuario", JSON.stringify(Users));
     mostrarModal();
});

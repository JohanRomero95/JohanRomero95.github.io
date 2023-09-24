// Expresiones regulares para validar el formulario de registro
const nombreRegex = /^[a-zA-Z ]{2,30}$/;
const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const registro = document.getElementById("registro");
const modal = document.querySelector(".modal");
const botonCerrarModal = document.querySelector(".modal__close");

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
     //  modal.classList.remove("modal--show");
     window.location.href = "login.html";
});

// Agregar un evento de clic al botón de registro
registro.addEventListener("click", function (e) {
     e.preventDefault();

     // Obtener valores de los campos del formulario
     const nombre = document.getElementById("nombre").value;
     const correo = document.getElementById("correo").value;
     const contrasena = document.getElementById("contrasena").value;

     // Validar los campos utilizando expresiones regulares
     if (!nombreRegex.test(nombre)) {
          // alert("Nombre no válido");
          return;
     }

     if (!correoRegex.test(correo)) {
          // alert("Correo electrónico inválido");
          return;
     }

     if (!contrasenaRegex.test(contrasena)) {
          // alert("La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número.");
          return;
     }

     // Almacenar los datos en el almacenamiento local
     const usuario = {
          nombre,
          correo,
          contrasena,
     };
     localStorage.setItem("usuario", JSON.stringify(usuario));

     // Mostrar el modal una vez que se han validado los datos y se ha guardado en localStorage
     mostrarModal();
});

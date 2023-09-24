// Expresiones regulares para validar el formulario de inicio de sesión
const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const openModal = document.getElementById("registro");
const modal1 = document.querySelector(".modal");

document.getElementById("loginForm").addEventListener("submit", function (e) {
     e.preventDefault();

     const correo = document.getElementById("correoLogin").value;
     const contrasena = document.getElementById("contrasenaLogin").value;

     // Valida los campos usando expresiones regulares
     if (!correoRegex.test(correo)) {
          alert("Correo electrónico no válido");
          return;
     }

     // Obtener los datos del almacenamiento local
     const usuarioRegistrado = JSON.parse(localStorage.getItem("usuario"));

     if (!usuarioRegistrado) {
          alert(
               "No se encontró ningún usuario registrado con ese correo electrónico."
          );
          return;
     }

     if (contrasena !== usuarioRegistrado.contrasena) {
          alert("La contraseña es incorrecta");
          return;
     }

     alert("Inicio de sesión exitoso");

     window.location.href = "inicio.html";
});

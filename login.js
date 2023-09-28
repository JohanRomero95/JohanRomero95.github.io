// Expresiones regulares para validar el formulario de inicio de sesión
const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const registro = document.getElementById("loginForm");
const modal = document.querySelector(".modal");
const botonCerrarModal = document.querySelector(".modal__close");

loginForm.addEventListener("submit", (e) => {
     e.preventDefault();

     const correo = document.getElementById("correoLogin").value;
     const contrasena = document.getElementById("contrasenaLogin").value;
     const Users = JSON.parse(localStorage.getItem("usuario")) || [];
     const validUser = Users.find(
          (user) => user.correo === correo && user.contrasena === contrasena
     );
     if (!validUser) {
          return alert("Correo y/o contraseña incorrecto");
     }
     alert(`Bienvenido ${validUser.nombre}`);

     modal.classList.add("modal--show");

     setTimeout(() => {
          window.location.href = "inicio.html";
     }, 15000);
});

// Evento boton cerrar
botonCerrarModal.addEventListener("click", (e) => {
     e.preventDefault();
     window.location.href = "inicio.html";
});

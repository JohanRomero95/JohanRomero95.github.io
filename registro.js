// Expresiones regulares para validar el formulario de registro
const nombreRegex = /^[a-zA-Z ]{2,30}$/;
const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const openModal = document.getElementById("registro");
const modal1 = document.querySelector(".modal");
const modalBackground = document.querySelector(".modal-background");

document
     .getElementById("registroForm")
     .addEventListener("submit", function (e) {
          e.preventDefault();

          // Obtener valores de los campos del formulario
          const nombre = document.getElementById("nombre").value;
          const correo = document.getElementById("correo").value;
          const contrasena = document.getElementById("contrasena").value;

          // Validar los campos utilizando expresiones regulares
          if (!nombreRegex.test(nombre)) {
               return;
          }

          if (!correoRegex.test(correo)) {
               return;
          }

          if (!contrasenaRegex.test(contrasena)) {
               return;
          }

          // Almacenar los datos en el almacenamiento local
          const usuario = {
               nombre,
               correo,
               contrasena,
          };
          localStorage.setItem("usuario", JSON.stringify(usuario));

          // Función modal
          const openModalClick = (e) => {
               e.preventDefault();
               modal1.classList.add("modal--show");

               // Agregar un setTimeout para retrasar la redirección en 10 segundos
               setTimeout(() => {
                    window.location.href = "login.html";
               }, 10000);
          };

          // Agregar un evento de clic al botón de registro
          openModal.addEventListener("click", openModalClick);

          // Redireccionar a la página de inicio de sesión
          window.location.href = "login.html";
     });

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

          const nombre = document.getElementById("nombre").value;
          const correo = document.getElementById("correo").value;
          const contrasena = document.getElementById("contrasena").value;

          // Expresiones regulares
          if (!nombreRegex.test(nombre)) {
               alert("Nombre no válido");
               return;
          }

          if (!correoRegex.test(correo)) {
               alert("Correo electrónico inválido");
               return;
          }

          if (!contrasenaRegex.test(contrasena)) {
               alert(
                    "La contraseña debe tener al menos 6 caracteres, una mayúscula, una minúscula y un número."
               );
               return;
          }

          // Almacena los datos en el almacenamiento local
          const usuario = {
               nombre,
               correo,
               contrasena,
          };
          localStorage.setItem("usuario", JSON.stringify(usuario));

          //  Funcion modal
          const modal = openModal.addEventListener("click", (e) => {
               e.preventDefault();
               modal1.classList.add("modal--show");

               // Agrega un setTimeout para retrasar la redirección en 10 segundos
               setTimeout(() => {
                    window.location.href = "login.html";
               }, 10000);
          });
          // Agregar un evento de clic al fondo del modal

          modal();

          //   localStorage.setItem("usuario", JSON.stringify(usuario));
          //   alert("Registro exitoso");

          window.location.href = "login.html";
     });

// modalBackground.addEventListener("click", (event) => {
//      // Verificar si el clic se realizó fuera del contenido del modal
//      if (event.target === modalBackground) {
//           // Cerrar el modal
//           modal.style.display = "none"; // O utiliza alguna otra forma de ocultar el modal
//      }
// });

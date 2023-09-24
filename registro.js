// Expresiones regulares para validar el formulario de registro
const nombreRegex = /^[a-zA-Z ]{2,30}$/;
const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const contrasenaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const openModal = document.getElementById("registro");
const modal1 = document.querySelector(".modal");

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
               // Agrega un setTimeout para retrasar la redirección en 2 segundos (2000 milisegundos)
               setTimeout(() => {
                    window.location.href = "login.html";
               }, 4000);
          });

          modal();

          //   localStorage.setItem("usuario", JSON.stringify(usuario));
          //   alert("Registro exitoso");

          window.location.href = "login.html";
     });

"use strict";

// Función para recopilar los datos del usuario y manejar el inicio de sesión.

document.addEventListener("DOMContentLoaded", function () {
  function initializeLoginModal() {
    // Defino las variables del modal y los botones de apertura y cierre.
    const loginModal = document.getElementById("loginModal");
    const loginBtn = document.querySelector(".nav-item_login");
    const closeBtn = document.querySelector(".close");

    loginBtn.addEventListener("click", function (event) {
      openModal(loginModal, event);
    });

    closeBtn.addEventListener("click", function () {
      closeModal(loginModal);
    });

    window.addEventListener("click", function (event) {
      closeModalOnOutsideClick(loginModal, event);
    });
  }

  function openModal(modal, event) {
    event.preventDefault();
    modal.style.display = "block";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  function closeModalOnOutsideClick(modal, event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  function initializeLoginForm() {
    const form = document.getElementById("form_login");
    form.addEventListener("submit", function (event) {
      //
      event.preventDefault();
      const username = document.getElementById("username").value; // Recopilo los datos del usuario.
      const password = document.getElementById("password").value;
      validateUser(username, password);
    });
  }

  function validateUser(username, password) {
    // Abre la base de datos, busca el usuario y maneja el resultado.
    const dbRequest = indexedDB.open("UserDatabase", 1);

    dbRequest.onsuccess = function (event) {
      const db = event.target.result;
      const transaction = db.transaction(["users"], "readonly");
      const objectStore = transaction.objectStore("users");
      const index = objectStore.index("username");
      const request = index.get(username);

      request.onsuccess = function () {
        handleLoginSuccess(request.result, password);
      };
    };

    dbRequest.onerror = function (event) {
      console.error("Error database:", event.target.error);
    };
  }

  function handleLoginSuccess(user, password) {
    // Comprueba si el usuario y la contraseña coinciden y maneja el resultado de validateUser.
    if (user && user.password === password) {
      console.log("Successful login");
      alert("Acceso concedido. Bienvenido!🙋‍♀️🙋‍♂️");
      handlePostLoginActions(user);
    } else {
      console.error("Login failed");
      alert(
        "Error en el inicio de sesión: Nombre de usuario o contraseña incorrectos.😥"
      );
    }
  }

  function handlePostLoginActions(user) {
    // Muestra el saludo y el botón de cierre de sesión.
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("form_login").reset();
    document.getElementById("loginSignUpButtons").style.display = "none";
    const userGreeting = document.getElementById("userGreeting");
    userGreeting.innerHTML = `¡Bienvenid@!😊, ${user.username} <button id="logoutBtn"  style="color:white" class="nav-item">Salir</button>`;
    userGreeting.style.display = "block";

    document.getElementById("logoutBtn").addEventListener("click", function () {
      localStorage.removeItem("user");
      window.location.reload();
    });
  }

  initializeLoginModal();
  initializeLoginForm();
});

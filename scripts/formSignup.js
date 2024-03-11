"use strict";

// Función para recopilar y enviar datos del usuario y manejo de errores.

document.addEventListener("DOMContentLoaded", function () {
  function initializeFormSubmission() {
    const signupForm = document.getElementById("form_signup"); // Defino el formulario de registro y le añado un evento de envío.
    signupForm.addEventListener("submit", handleFormSubmit);
  }

  // Envñio formulario
  function handleFormSubmit(event) {
    event.preventDefault();

    // Recopilo datos como objeto
    const userData = collectUserData();

    addUser(userData, () => {
      showSuccessMessage();
      closeSignupModal();
    });
  }

  // Función para crear el objeto
  function collectUserData() {
    return {
      username: document.getElementById("signup_username").value,
      password: document.getElementById("signup_password").value,
      email: document.getElementById("signup_email").value,
    };
  }

  function showSuccessMessage() {
    alert("Registrado con éxito.🤘¡Ahora molas más!🤘");
  }

  function closeSignupModal() {
    document.getElementById("signupModal").style.display = "none";
  }

  const signupBtn = document.querySelector(".nav-item"); // Defino selector del botón de registro, del modal y del botón de cierre.
  const signupModal = document.getElementById("signupModal");
  const closeBtn = document.querySelector(".close");

  function initializeModalEventListeners() {
    // Añado eventos para abrir y cerrar el modal.
    signupBtn.addEventListener("click", function (event) {
      openModal(event);
    });

    closeBtn.addEventListener("click", function () {
      closeModal();
    });

    window.addEventListener("click", function (event) {
      closeOnOutsideClick(event);
    });
  }

  function openModal(event) {
    event.preventDefault();
    signupModal.style.display = "block";
  }

  function closeModal() {
    signupModal.style.display = "none";
  }

  function closeOnOutsideClick(event) {
    if (event.target == signupModal) {
      signupModal.style.display = "none";
    }
  }

  initializeFormSubmission();
  initializeModalEventListeners();
});

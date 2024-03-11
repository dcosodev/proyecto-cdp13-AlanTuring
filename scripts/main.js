"use strict";

// Elementos DOM de la lista de reproducción y el sidebar.

document.addEventListener("DOMContentLoaded", function () {
  initializePlaylistItems();
  initializeSidebarToggle();
});

function initializePlaylistItems() {
  
  const playlistItems = document.querySelectorAll(".playlist-item"); // Selecciona todos los elementos de la lista de reproducción.

  playlistItems.forEach(function (item) {
    
    item.addEventListener("mouseover", function () { // Añado eventos de ratón para escalar los elementos de la lista de reproducción.
      scaleElement(item, 1.05);
    });

    item.addEventListener("mouseout", function () {
      scaleElement(item, 1);
    });
  });
}


function scaleElement(element, scaleValue) { 
  element.style.transform = `scale(${scaleValue})`; // Escala el elemento.
}


function initializeSidebarToggle() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarLogo = document.querySelector(".sidebar-logo"); // Selecciona el sidebar y el logo del sidebar.
  const headerLogo = document.getElementById("headerLogo");

  // Event listeners para los logos que controlan el sidebar.
  headerLogo.addEventListener("click", function (event) {
    event.preventDefault();
    toggleSidebar(sidebar);
  });

  sidebarLogo.addEventListener("click", function (event) {
    event.preventDefault();
    toggleSidebar(sidebar);
  });
}


function toggleSidebar(sidebarElement) { // Función para mostrar y ocultar el sidebar.
  sidebarElement.classList.toggle("is-expanded");
}

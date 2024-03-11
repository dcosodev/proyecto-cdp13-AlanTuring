"use strict";

// Función para que la imagen siga el mouse, defino el manejo del movimiento del ratón y dónde se debe mostrar la imagen.

function initializeMouseMove() {
  document.addEventListener("mousemove", handleMouseMove);
}

// Movimiento del ratón.
function handleMouseMove(e) {
  const followImg = document.getElementById("followMouse");
  if (shouldShowImage(e.clientY)) {
    showImage(followImg, e.clientX, e.clientY);
  } else {
    hideImage(followImg);
  }
}

function shouldShowImage(mouseY) {
  return mouseY < window.innerHeight / 2;
}

function showImage(followImg, mouseX, mouseY) {
  followImg.style.visibility = "visible";
  followImg.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
}

function hideImage(followImg) {
  followImg.style.visibility = "hidden";
}

initializeMouseMove();

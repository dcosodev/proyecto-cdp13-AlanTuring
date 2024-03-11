"use strict";

// Script para el parallax de la nave espacial, uso gsap para animar con back.in ease que hace que el cambio de escala sea más natural.


function logoClick() {
  gsap.to(".logo", {
    duration: 0.5,
    opacity: 0,
    scale: 0.5,
    ease: "back.in",
    onComplete: () => {
      window.location.href = "./indexPlayer.html"; 
    },
  });
}

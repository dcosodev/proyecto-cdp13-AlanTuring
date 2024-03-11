"use strict";

//  Funciones para buscar letras de canciones a través del proxy y mostrar los resultados.




let baseUrl;
if (window.location.hostname === "localhost") {
    baseUrl = "http://localhost:3000"; // URL de desarrollo
} else {
    baseUrl = window.location.origin; // URL de producción (Heroku)
}


document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
  setupEventListeners();
}

function setupEventListeners() {
  const searchButton = document.getElementById("lyricsSearchButton"); // Defino los elementos del botón de búsqueda, el campo de búsqueda y el botón de cierre.
  const input = document.getElementById("lyricsSearchInput");
  const closeResults = document.querySelector("#searchResults .close");
  const resultsModal = document.getElementById("searchResults");

  searchButton.addEventListener("click", handleSearchButtonClick); // Añado eventos para el botón de búsqueda, el campo de búsqueda y el botón de cierre.
  input.addEventListener("keypress", handleInputKeypress);
  closeResults.addEventListener("click", handleCloseResultsClick);
  window.addEventListener("click", (event) =>
    handleWindowClick(event, resultsModal)
  );
}

function handleSearchButtonClick(e) { 
  e.preventDefault();
  const input = document.getElementById("lyricsSearchInput");
  const lyricsToSearch = input.value.trim();
  if (lyricsToSearch) {
    searchLyricsThroughProxy(lyricsToSearch); // Llama a la función de búsqueda de letras.
  }
}

function handleInputKeypress(e) { // Añade la funcionalidad de búsqueda al pulsar Enter.
  if (e.key === "Enter") {
    e.preventDefault();
    const searchButton = document.getElementById("lyricsSearchButton");
    searchButton.click();
  }
}

function handleCloseResultsClick() {
  const resultsModal = document.getElementById("searchResults");
  resultsModal.style.display = "none";
}

function handleWindowClick(event, modal) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function searchLyricsThroughProxy(lyrics) { // Función para buscar letras a través del proxy.
  const proxyUrl = `${baseUrl}/searchLyrics`; 
  fetch(`${proxyUrl}?lyrics=${encodeURIComponent(lyrics)}`)
    .then((response) => response.json())
    .then((data) => handleSearchResults(data))
    .catch((error) => handleSearchError(error));
}

function handleSearchResults(data) {
  if (data.message.header.status_code === 200) {
    displaySearchResults(data.message.body.track_list);
  } else {
    console.error("Error fetch:", data.message.header);
    alert("No se ha podido encontrar la letra. Por favor, inténtalo de nuevo.");
  }
}

function handleSearchError(error) {
  console.error("Error searching:", error);
  alert(
    "Se ha producido un error durante la búsqueda. Compruebe su conexión de red e inténtelo de nuevo."
  );
}

function displaySearchResults(tracks) {
  const resultsContent = document.getElementById("resultsContent");
  const resultsModal = document.getElementById("searchResults");
  clearResultsContent(resultsContent);
  if (tracks.length === 0) {
    showNoResultsMessage(resultsContent);
  } else {
    populateResults(tracks, resultsContent);
  }
  resultsModal.style.display = "block";
}

function clearResultsContent(container) {
  container.innerHTML = "";
}

function showNoResultsMessage(container) {
  container.innerHTML = "<p>No se encontraron resultados😥</p>";
}

function populateResults(tracks, container) {  // Crea una lista de resultados de búsqueda y la añade al contenedor.
  const ul = document.createElement("ul"); 
  tracks.forEach((track) => createTrackListItem(track, ul));
  container.appendChild(ul);
}

function createTrackListItem(track, listContainer) {  // Crea un botón para cada resultado de búsqueda y lo añade a la lista.
  const li = document.createElement("li"); 
  const button = createTrackButton(track);
  li.appendChild(button);
  listContainer.appendChild(li);
}

function createTrackButton(track) { 
  const button = document.createElement("button");
  button.textContent = `${track.track.artist_name} - ${track.track.track_name}`; // Añade el nombre del artista y de la canción al botón.
  button.className = "search-result-button";
  button.addEventListener("click", () => fetchLyrics(track.track.track_id)); // Añade un evento para buscar las letras al hacer clic en el botón.
  return button;
}

function fetchLyrics(trackId) {
  const proxyUrl = `${baseUrl}/fetchLyrics`;
  fetch(`${proxyUrl}?track_id=${trackId}`)
    .then((response) => response.json()) 
    .then((data) => handleLyricsResult(data)) /// Llama a la función para manejar los resultados de las letras.
    .catch((error) => console.error("Error fetching lyrics:", error));
}

function handleLyricsResult(data) {
  if (data.message.header.status_code === 200) {
    const lyrics = data.message.body.lyrics.lyrics_body; // Recoge las letras de la canción.
    displayLyrics(lyrics); // Llama a la función para mostrar las letras.
  } else {
    console.error("Error fetching lyrics", data.message.header);
  }
}

function displayLyrics(lyrics) { 
  const resultsContent = document.getElementById("resultsContent"); // Muestra las letras de la canción en el contenedor de resultados.
  resultsContent.innerHTML = `<p>${lyrics.replace(/\n/g, "<br>")}</p>`;
}

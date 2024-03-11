"use strict";

// Para añadir el usuario establezco conexión con la bbdd, le paso los datos del usuario en un objeto y defino una función para añadir el usuario con manejo de errores.

function addUser(data, onSuccess) {
  const dbConnection = dbRequest.result;

  const transaction = dbConnection.transaction(["users"], "readwrite");

  const objectStore = transaction.objectStore("users");

  const request = objectStore.add(data);

  request.onsuccess = function () {
    console.log("Usuario añadido con éxito:", request.result);
    onSuccess();
  };

  request.onerror = function (event) {
    console.error("Error al añadir usuario:", event.target.error);
  };
}

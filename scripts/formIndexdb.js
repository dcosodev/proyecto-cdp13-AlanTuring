"use strict";

// Conexión o creación de la base de datos. Manejo de erores, actualización y creación de almacén de objetos.

const dbRequest = indexedDB.open("UserDatabase", 1);

dbRequest.onupgradeneeded = function (event) {
  // Manejo la actualización o creación de la base de datos.
  upgradeDatabase(event);
};

dbRequest.onerror = function (event) {
  handleDatabaseError(event);
};

function upgradeDatabase(event) {
  const db = event.target.result;

  // Creo almacén de objetos "users" con clave primaria id autoincrementable.
  const objectStore = db.createObjectStore("users", {
    keyPath: "id",
    autoIncrement: true,
  });

  objectStore.createIndex("username", "username", { unique: true }); // Creo índice único para el nombre de usuario y el email.
  objectStore.createIndex("email", "email", { unique: true });
}

function handleDatabaseError(event) {
  console.error("Database error:", event.target.error);
}

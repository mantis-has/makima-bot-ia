// Simulación de datos de usuario
const usuarioData = {
 nombre: "Juan Pérez",
 email: "juan@example.com",
 idioma: "Español",
 notificaciones: "Activadas",
};

// Mostrar datos de usuario
document.getElementById("nombre-usuario").textContent = usuarioData.nombre;
document.getElementById("email-usuario").textContent = usuarioData.email;
document.getElementById("idioma-usuario").textContent = usuarioData.idioma;
document.getElementById("notificaciones-usuario").textContent = usuarioData.notificaciones;

// Agregar evento para editar perfil
document.getElementById("editar-perfil").addEventListener("click", () => {
 // Aquí se puede agregar la lógica para editar el perfil del usuario
 alert("Editando perfil...");
});

// Agregar evento para editar configuración
document.getElementById("editar-configuracion").addEventListener("click", () => {
 // Aquí se puede agregar la lógica para editar la configuración del usuario
 alert("Editando configuración...");
});
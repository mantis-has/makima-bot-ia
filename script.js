// Simulación de datos de usuarios
const usuarios = [
 { id: 1, nombre: "Juan", email: "juan@example.com" },
 { id: 2, nombre: "María", email: "maria@example.com" },
];

// Mostrar usuarios en la tabla
const usuariosTable = document.getElementById("usuarios-table");
usuarios.forEach((usuario) => {
 const row = document.createElement("tr");
 row.innerHTML = `
 <td>${usuario.nombre}</td>
 <td>${usuario.email}</td>
 <td><button>Editar</button> <button>Eliminar</button></td>
 `;
 usuariosTable.appendChild(row);
});

// Agregar evento para agregar usuario
document.getElementById("agregar-usuario").addEventListener("click", () => {
 // Aquí se puede agregar la lógica para agregar un nuevo usuario
 alert("Agregar usuario");
});

// Agregar evento para guardar contenido
document.getElementById("guardar-contenido").addEventListener("click", () => {
 const contenido = document.getElementById("contenido-textarea").value;
 // Aquí se puede agregar la lógica para guardar el contenido
 alert("Contenido guardado");
});

// Simulación de datos de monitoreo
const monitoreoData = {
 estadoSistema: "Activo",
 usoCpu: "50%",
 usoMemoria: "75%",
};

// Mostrar datos de monitoreo
document.getElementById("estado-sistema").textContent = monitoreoData.estadoSistema;
document.getElementById("uso-cpu").textContent = monitoreoData.usoCpu;
document.getElementById("uso-memoria").textContent = monitoreoData.usoMemoria;

// Agregar evento para reiniciar sistema
document.getElementById("reiniciar-sistema").addEventListener("click", () => {
 // Aquí se puede agregar la lógica para reiniciar el sistema
 alert("Reiniciando sistema...");
});

// Agregar evento para apagar sistema
document.getElementById("apagar-sistema").addEventListener("click", () => {
 // Aquí se puede agregar la lógica para apagar el sistema
 alert("Apagando sistema...");
});

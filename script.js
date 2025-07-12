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

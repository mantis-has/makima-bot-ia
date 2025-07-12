// Simulación de datos de pedidos y clientes
const pedidosData = [
 { id: 1, cliente: "Juan Pérez", fecha: "2023-02-15", total: 100.00 },
 { id: 2, cliente: "María Rodríguez", fecha: "2023-02-20", total: 200.00 },
];

const clientesData = [
 { id: 1, nombre: "Juan Pérez", email: "juan@example.com", telefono: "1234567890" },
 { id: 2, nombre: "María Rodríguez", email: "maria@example.com", telefono: "9876543210" },
];

// Mostrar pedidos y clientes
const pedidosTable = document.getElementById("pedidos-data");
pedidosData.forEach((pedido) => {
 const row = document.createElement("tr");
 row.innerHTML = `
 <td>${pedido.id}</td>
 <td>${pedido.cliente}</td>
 <td>${pedido.fecha}</td>
 <td>$${pedido.total.toFixed(2)}</td>
 `;
 pedidosTable.appendChild(row);
});

const clientesTable = document.getElementById("clientes-data");
clientesData.forEach((cliente) => {
 const row = document.createElement("tr");
 row.innerHTML = `
 <td>${cliente.nombre}</td>
 <td>${cliente.email}</td>
 <td>${cliente.telefono}</td>
 `;
 clientesTable.appendChild(row);
});

// Calcular total de ventas
const totalVentas = pedidosData.reduce((acc, pedido) => acc + pedido.total, 0);
document.getElementById("total-ventas").textContent = `$${totalVentas.toFixed(2)}`;

// Agregar evento para nuevo pedido
document.getElementById("nuevo-pedido").addEventListener("click", () => {
 // Aquí se puede agregar la lógica para crear un nuevo pedido
 alert("Nuevo pedido");
});
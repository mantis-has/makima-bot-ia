const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

// Archivo a editar colaborativamente
const FILE_PATH = path.join(__dirname, 'archivo_colaborativo.js');

// Inicializa archivo si no existe
if (!fs.existsSync(FILE_PATH)) {
  fs.writeFileSync(FILE_PATH, "// Código colaborativo aquí\n");
}

// Endpoint para obtener el contenido inicial
app.get('/file', (req, res) => {
  fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
    if (err) return res.status(500).send('Error leyendo archivo');
    res.send(data);
  });
});

// Endpoint para guardar el archivo (opcional, puedes usar solo sockets)
app.post('/file', (req, res) => {
  const { content } = req.body;
  fs.writeFile(FILE_PATH, content, (err) => {
    if (err) return res.status(500).send('Error guardando archivo');
    res.send('Guardado');
  });
});

// Colaboración en tiempo real
let currentContent = fs.readFileSync(FILE_PATH, 'utf-8');
io.on('connection', (socket) => {
  // Manda el contenido actual al conectar
  socket.emit('init', currentContent);

  // Cuando un usuario hace cambios
  socket.on('edit', (content) => {
    currentContent = content;
    fs.writeFile(FILE_PATH, currentContent, () => {});
    // Manda a todos menos al remitente
    socket.broadcast.emit('update', content);
  });
});

server.listen(3001, () => console.log('Servidor colaborativo en puerto 3001'));

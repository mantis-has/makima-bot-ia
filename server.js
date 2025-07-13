// server.js
const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Expresión regular para limitar comandos permitidos
const allowed = /^(ls|cat|echo|git clone|npm install|touch|rm|pwd)[^&|;]*$/;

app.post('/command', (req, res) => {
  const { command } = req.body;
  if (!allowed.test(command)) {
    return res.send('Comando no permitido.');
  }
  exec(command, { cwd: process.cwd() }, (err, stdout, stderr) => {
    if (err) return res.send(stderr);
    res.send(stdout);
  });
});

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'));

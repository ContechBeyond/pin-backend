const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // En producción, especifica tu dominio del frontend
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 10000;

app.use(cors());

// Servir archivos estáticos (para el HTML de prueba)
app.use(express.static('.'));

let currentPin = generatePin();
let pinGeneratedAt = Date.now();
const PIN_DURATION = 0.17 * 60 * 1000; // 30 segundos

function generatePin() {
  let pin = '';
  for (let i = 0; i < 10; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  return pin;
}

function getPinWithTimeInfo() {
  const currentTime = Date.now();
  const timeRemaining = Math.max(0, PIN_DURATION - (currentTime - pinGeneratedAt));
  
  return {
    pin: currentPin,
    timeRemaining: timeRemaining,
    generatedAt: pinGeneratedAt,
    duration: PIN_DURATION
  };
}

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  // Enviar el PIN actual con información de tiempo cuando un cliente se conecta
  socket.emit('currentPin', getPinWithTimeInfo());
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Cambiar cada 30 segundos
setInterval(() => {
  currentPin = generatePin();
  pinGeneratedAt = Date.now();
  console.log("Nuevo PIN:", currentPin);
  
  // Enviar el nuevo PIN con información de tiempo a todos los clientes conectados
  io.emit('newPin', getPinWithTimeInfo());
}, PIN_DURATION);

app.get("/pin", (req, res) => {
  res.json(getPinWithTimeInfo());
});

server.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
  console.log(`Socket.io configurado y listo`);
});

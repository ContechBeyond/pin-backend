const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

let currentPin = generatePin();

function generatePin() {
  let pin = '';
  for (let i = 0; i < 10; i++) {
    pin += Math.floor(Math.random() * 10);
  }
  return pin;
}

// Cambiar cada 5 minutos
setInterval(() => {
  currentPin = generatePin();
  console.log("Nuevo PIN:", currentPin);
}, 5 * 60 * 1000);

app.get("/pin", (req, res) => {
  res.json({ pin: currentPin });
});

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});

const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const lowercaseBody = {};
  for (let key in req.body) {
    lowercaseBody[key.toLowerCase()] = req.body[key];
  }

  const { username, password } = lowercaseBody;

  if (!username || !password) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }
  // Combinar ambas respuestas en un solo objeto JSON
  const response = {
    usuario,
    message: 'Login successful'
  };

  // Enviar la respuesta combinada
  res.status(201).json(response);
});

module.exports = router;

const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');

// Ruta POST para registrar un usuario
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }

  try {
    // Guardar la información del usuario en Firestore
    const userRef = await admin.firestore().collection('users').add({
      username,
      email,
      password,
      tweets: []
    });

    // Enviar respuesta al cliente
    res.status(201).json({ message: 'Usuario registrado correctamente :)' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al registrar usuario.' });
  }
});

module.exports = router;

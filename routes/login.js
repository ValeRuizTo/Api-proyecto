const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');

// Ruta POST para iniciar sesión
router.post("/", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'Usuario/correo electrónico y contraseña son obligatorios.' });
  }

  try {
// Buscar al usuario por correo electrónico o nombre de usuario
const userSnapshot = await admin.firestore().collection('users').get();

let userData;
userSnapshot.forEach(doc => {
  const user = doc.data();
  if (user.username === usernameOrEmail || user.email === usernameOrEmail) {
    userData = user;
  }
});

if (!userData) {
  return res.status(404).json({ error: 'Usuario no encontrado.' });
}

    // Enviar la información del usuario al cliente
    res.status(200).json(userData);

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión.' });
  }
});

module.exports = router;

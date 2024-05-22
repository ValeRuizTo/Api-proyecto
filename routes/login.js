const express = require("express");
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');

const router = express.Router();

const secretKey = 'mysecretkey';

// Ruta POST para iniciar sesión
router.post("/", async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(400).json({ error: 'Usuario/correo electrónico y contraseña son obligatorios.' });
  }

  try {
    // Buscar al usuario por correo electrónico o nombre de usuario
    const userSnapshot = await admin.firestore().collection('users')
      .where('username', '==', usernameOrEmail)
      .get();

    let userData;
    userSnapshot.forEach(doc => {
      const user = doc.data();
      // Verificar la contraseña solo si se encontró un usuario
      if (user.password === password) {
        userData = user;
        delete userData.password; // Eliminar la contraseña del objeto userData
      }
    });

    if (!userData) {
      // Si no se encuentra el usuario por nombre de usuario, buscar por correo electrónico
      const emailSnapshot = await admin.firestore().collection('users')
        .where('email', '==', usernameOrEmail)
        .get();

      emailSnapshot.forEach(doc => {
        const user = doc.data();
        if (user.password === password) {
          userData = user;
          delete userData.password; // Eliminar la contraseña del objeto userData
        }
      });
    }

    if (!userData) {
      return res.status(404).json({ error: '¡Credenciales incorrectas!' });
    }

    // Generar un token JWT
    const token = jwt.sign({ usernameOrEmail }, secretKey, { expiresIn: '1h' });

  
    // Enviar la información del usuario y el token JWT al cliente
    res.status(200).json({ userData, token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Ocurrió un error al iniciar sesión.' });
  }
});

module.exports = router;

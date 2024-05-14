const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const verifySessionCookie = require('../middleware/verifySessionCookie');


// Ruta GET para obtener el perfil de usuario por username
router.get("/:username", verifySessionCookie, async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: 'Proporcione un nombre de usuario válido.' });
  }

  try {
    // Buscar al usuario por nombre de usuario
    const userSnapshot = await admin.firestore().collection('users')
      .where('username', '==', username)
      .get();

    let userData;
    userSnapshot.forEach(doc => {
      userData = doc.data();
    });

    if (!userData) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

        // Verificar si el usuario de la sesión es el mismo que el usuario consultado
    const sessionUsername = req.user.usernameOrEmail;
    if (sessionUsername === username) {
      // Si es el mismo usuario, enviar toda la información excepto la contraseña
      const { password, ...userDataWithoutPassword } = userData; // Excluyendo la contraseña
      res.status(200).json(userDataWithoutPassword);
    } else {
      // Si no es el mismo usuario, enviar solo el username y los tweets
      const { username, tweets } = userData;
      res.status(200).json({ username, tweets });
    }

  } catch (error) {
    console.error('Error al buscar usuario por username:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar usuario.' });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const verifySessionCookie = require('../middleware/verifySessionCookie');


// Ruta GET para obtener el perfil de usuario por username
router.get("/:username",verifySessionCookie, async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ error: 'Proporcione un nombre de usuario válido.' });
  }

  try {
    // Buscar al usuario por nombre de usuario
    const userSnapshot = await admin.firestore().collection('users')
      .where('username', '==', username)
      .select('username', 'email', 'tweets')
      .get();

    let userData;
    userSnapshot.forEach(doc => {
      userData = doc.data();
    });

    if (!userData) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Enviar la información del usuario al cliente
    res.status(200).json(userData);

  } catch (error) {
    console.error('Error al buscar usuario por username:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar usuario.' });
  }
});

module.exports = router;

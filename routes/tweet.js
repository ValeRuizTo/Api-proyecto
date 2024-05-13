const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const verifySessionCookie = require('../middleware/verifySessionCookie');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

// Ruta POST para buscar usuario y agregar tweet
router.post("/", verifySessionCookie, async (req, res) => {
  const { tweet } = req.body;
  const userId = req.user.userId;

  if (!tweet) {
    return res.status(400).json({ error: 'El parámetro tweet es obligatorio.' });
  }

  try {
    // Agregar tweet a la lista de tweets del usuario
    await admin.firestore().collection('users').doc(userId).update({
      tweets: admin.firestore.FieldValue.arrayUnion(tweet)
    });

    // Enviar respuesta al cliente
    res.status(201).json({ message: 'Tweet agregado correctamente :)' });
  } catch (error) {
    console.error('Error al agregar tweet:', error);
    res.status(500).json({ error: 'Ocurrió un error al agregar tweet.' });
  }
});

module.exports = router;

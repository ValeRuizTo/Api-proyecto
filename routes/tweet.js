const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');

// Ruta POST para buscar usuario y agregar tweet
router.post("/", async (req, res) => {
  const { usernameOrEmail, tweet } = req.body;

  if (!usernameOrEmail || !tweet) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }

  try {
    // Buscar usuario por username o email
    const userRef = await admin.firestore().collection('users')
      .where('username', '==', usernameOrEmail)
      .limit(1)
      .get();

    if (userRef.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const user = userRef.docs[0];
    const userId = user.id;

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
const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');

// Ruta POST para buscar usuario y agregar tweet
router.post("/", async (req, res) => {
  const { tweet, username } = req.body;

  if (!tweet || !username) {
    return res.status(400).json({ error: 'Los parámetros tweet y username son obligatorios.' });
  }

  try {
    // Buscar usuario por su username
    const userSnapshot = await admin.firestore().collection('users').where('username', '==', username).get();

    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Obtener el userId del primer usuario encontrado (asumiendo que el username es único)
    const userId = userSnapshot.docs[0].id;

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

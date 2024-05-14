const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Ruta POST para buscar usuario y agregar tweet
router.post("/", jwtMiddleware, async (req, res) => {
  const { tweet } = req.body;
  const username = req.user.usernameOrEmail; // Obtener el nombre de usuario de la sesión

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
router.put("/:tweetIndex", jwtMiddleware, async (req, res) => {
  const { tweetIndex } = req.params;
  const { tweet } = req.body;
  const sessionUsername = req.user.usernameOrEmail;

  try {
    // Buscar al usuario por su username
    const userSnapshot = await admin.firestore().collection('users').where('username', '==', sessionUsername).get();

    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const userData = userSnapshot.docs[0].data();
    const tweets = userData.tweets || [];

    if (tweetIndex < 0 || tweetIndex >= tweets.length) {
      return res.status(404).json({ error: 'Índice de tweet inválido.' });
    }

    tweets[tweetIndex] = tweet;

    // Actualizar el array de tweets en la base de datos
    await admin.firestore().collection('users').doc(userSnapshot.docs[0].id).update({
      tweets: tweets
    });

    res.status(200).json({ message: 'Tweet modificado correctamente.' });
  } catch (error) {
    console.error('Error al modificar el tweet:', error);
    res.status(500).json({ error: 'Ocurrió un error al modificar el tweet.' });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Ruta GET para obtener todos los tweets con el nombre de usuario y hashtag
router.get("/", jwtMiddleware, async (req, res) => {
  try {
    // Obtener todos los usuarios de la colección 'users' en Firestore
    const usersSnapshot = await admin.firestore().collection('users').get();

    let tweetsWithUsernamesAndHashtags = [];
    // Iterar sobre cada usuario
    for (const userDoc of usersSnapshot.docs) {
      const userData = userDoc.data();
      // Obtener el nombre de usuario del usuario
      const username = userData.username;
      // Obtener la lista de tweets del usuario
      const userTweets = userData.tweets || []; // Suponiendo que 'tweets' es un campo en la colección de usuarios que almacena la lista de tweets
      // Construir un objeto que contenga el tweet, el nombre de usuario y el hashtag para cada tweet del usuario
      for (const tweet of userTweets) {
        // Verificar si el tweet es un objeto o una cadena de texto
        const tweetObject = typeof tweet === 'object' ? tweet : { tweet }; // Si es un objeto, usa el mismo, de lo contrario, crea un objeto con la cadena de texto del tweet
        const tweetWithUsernameAndHashtag = {
          tweet: tweetObject.tweet,
          username: username,
          hashtag: tweetObject.hashtag || '' // Si no hay hashtag, usar cadena vacía
        };
        // Agregar este objeto a la lista de tweets con nombres de usuario y hashtags
        tweetsWithUsernamesAndHashtags.push(tweetWithUsernameAndHashtag);
      }
    }

    // Devolver la lista de tweets con nombres de usuario y hashtags como respuesta
    res.status(200).json(tweetsWithUsernamesAndHashtags);
  } catch (error) {
    console.error('Error al obtener tweets con nombres de usuario y hashtags:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener tweets con nombres de usuario y hashtags.' });
  }
});


module.exports = router;

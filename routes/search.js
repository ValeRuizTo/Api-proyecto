const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
const jwtMiddleware = require('../middleware/jwtMiddleware');

// Ruta GET para buscar tweets por contenido
router.get("/key", jwtMiddleware, async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'El parámetro de búsqueda es obligatorio.' });
  }

  try {
    // Buscar todos los usuarios
    const userSnapshot = await admin.firestore().collection('users').get();

    let tweets = [];
    userSnapshot.forEach(doc => {
      const user = doc.data();
      if (user.tweets) {
        user.tweets.forEach(tweet => {
          // Buscar tweets que coincidan con el contenido
          if (tweet.tweet && tweet.tweet.includes(search)) {
            tweets.push({ tweet, username: user.username });
          }
        });
      }
    });

    // Limitar a un máximo de 10 tweets
    tweets = tweets.slice(0, 10);

    res.status(200).json({ tweets });

  } catch (error) {
    console.error('Error al buscar tweets:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar tweets.' });
  }
});

// Ruta GET para buscar tweets por hashtag
router.get("/hashtag", jwtMiddleware, async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'El parámetro de búsqueda es obligatorio.' });
  }

  try {
    // Buscar todos los usuarios
    const userSnapshot = await admin.firestore().collection('users').get();

    let tweets = [];
    userSnapshot.forEach(doc => {
      const user = doc.data();
      if (user.tweets) {
        user.tweets.forEach(tweet => {
          // Buscar tweets que coincidan con el hashtag
          if (tweet.hashtag && tweet.hashtag.includes(search)) {
            tweets.push({ tweet, username: user.username });
          }
        });
      }
    });

    // Limitar a un máximo de 10 tweets
    tweets = tweets.slice(0, 10);

    res.status(200).json({ tweets });

  } catch (error) {
    console.error('Error al buscar tweets:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar tweets.' });
  }
});

module.exports = router;

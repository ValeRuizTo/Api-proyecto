const express = require('express');
const router = express.Router();

let tweets = [];

router.post('/', (req, res) => {
  const { content, username } = req.body;

  tweets.push({ username, content });
  res.status(201).json({ message: 'Tweet posted successfully' });
});

module.exports = router;

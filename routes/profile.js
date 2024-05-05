const express = require('express');
const router = express.Router();


router.get('/:username', (req, res) => {
  const username = req.params.username;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userTweets = tweets.filter(tweet => tweet.username === username);
  res.json({ username: user.username, email: user.email, tweets: userTweets });
});

module.exports = router;

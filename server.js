const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

let users = [];
let tweets = [];

app.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  users.push({ username, email, password });
  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful' });
});

app.get('/profile/:username', (req, res) => {
  const username = req.params.username;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userTweets = tweets.filter(tweet => tweet.username === username);
  res.json({ username: user.username, email: user.email, tweets: userTweets });
});

app.post('/tweet', (req, res) => {
  const { content, username } = req.body;

  tweets.push({ username, content });
  res.status(201).json({ message: 'Tweet posted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 


const express = require('express');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

app.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Please provide valid credentials' });
  }

  res.status(201).json({ message: 'User registered successfully' });
});

app.post('/login', (req, res) => {
  res.json({ message: 'Login successful' });
});

app.post('/tweet', (req, res) => {
  res.status(201).json({ message: 'Tweet posted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 


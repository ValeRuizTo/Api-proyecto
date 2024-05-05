const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();

let users = [];

router.post('/', [
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

module.exports = router;

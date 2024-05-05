const express = require('express');
const router = express.Router();

let users = [];

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);

  if (!user || user.password !== password) {
    return res.status(400).json({ message: 'Invalid username or password' });
  }

  res.json({ message: 'Login successful' });
});

module.exports = router;

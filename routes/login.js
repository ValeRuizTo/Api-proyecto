const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
  const lowercaseBody = {};
  for (let key in req.body) {
    lowercaseBody[key.toLowerCase()] = req.body[key];
  }

  const { username, password } = lowercaseBody;

  if (!username || !password) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }


  const usuario = {
    username,
    password,
  };

  res.status(201).json(usuario);
  res.json({ message: 'Login successful' });

});


module.exports = router;

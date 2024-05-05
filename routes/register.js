const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
  const lowercaseBody = {};
  for (let key in req.body) {
    lowercaseBody[key.toLowerCase()] = req.body[key];
  }

  const { username, email, password } = lowercaseBody;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }


  const usuario = {
    username,
    email,
    password,
  };

  res.status(201).json(usuario);
  res.json({ message: 'Usuario registrado correctamente' });

});


module.exports = router;

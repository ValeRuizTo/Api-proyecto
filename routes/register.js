const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
  const lowercaseBody = {};
  for (let key in req.body) {
    lowercaseBody[key.toLowerCase()] = req.body[key];
  }

  const { username, email, pasword } = lowercaseBody;

  if (!username || !email || !pasword) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }


  const usuario = {
    username,
    email,
    pasword,
  };

  res.status(201).json(usuario);
});


module.exports = router;

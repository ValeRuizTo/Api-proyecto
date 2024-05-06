const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {
    //objeto vacio
  const lowercaseBody = {};
  for (let key in req.body) {
    lowercaseBody[key.toLowerCase()] = req.body[key];
  }

  const { username, content } = lowercaseBody;

  if (!username || !content) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }


  const usuario = {
    username,
    content,
   
  };

  res.status(201).json(usuario);

});


module.exports = router;

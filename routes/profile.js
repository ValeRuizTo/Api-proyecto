const express = require('express');
const router = express.Router();

router.get("/:user", (req, res) => {
  const { user } = req.params;

  if (!user) {
    return res.status(400).json({ message: 'No user provided' });
  }

  res.json({ message: `Tu usuario es ${user} y tus tweets son...` });
});

module.exports = router;

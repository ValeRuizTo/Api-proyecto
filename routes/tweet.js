const express = require('express');
const router = express.Router();



router.post('/', (req, res) => {
 
  res.status(201).json({ message: 'Tweet posted successfully' });
});

module.exports = router;

const express = require('express');
const fs = require('fs');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

let users = [];

// Cargar usuarios desde el archivo JSON al iniciar el servidor
try {
  const usersData = fs.readFileSync('users.json');
  users = JSON.parse(usersData);
} catch (error) {
  console.error('Error loading users:', error);
}

// Middleware para guardar usuarios en el archivo JSON
function saveUsersToFile() {
  fs.writeFile('users.json', JSON.stringify(users), (err) => {
    if (err) {
      console.error('Error saving users:', err);
    }
  });
}

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
  saveUsersToFile(); // Guardar cambios en el archivo JSON
  res.status(201).json({ message: 'User registered successfully' });
});

// Otras rutas y lógica del servidor...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 


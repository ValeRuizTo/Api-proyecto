const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Configurar Firebase Admin SDK con las credenciales
const serviceAccount = require('./proyecto-89f44-firebase-adminsdk-dh4cl-5817736481.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



// Rutas de tu API
// Ejemplo:
app.get('/users', async (req, res) => {
  try {
    // Ejemplo de acceso a la base de datos de Firestore
    const usuariosSnapshot = await admin.firestore().collection('users').get();
    const usuarios = usuariosSnapshot.docs.map(doc => doc.data());
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
});


// Ruta POST para registrar un usuario
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Los parámetros son obligatorios.' });
  }

  try {
    // Guardar la información del usuario en Firestore
    await admin.firestore().collection('users').add({
      username,
      email,
      password
    });

    // Enviar respuesta al cliente
    res.status(201).json({ message: 'Usuario registrado correctamente :)' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Ocurrió un error al registrar usuario.' });
  }
});


// Escuchar en un puerto
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
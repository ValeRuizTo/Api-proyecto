const express = require('express');
const admin = require('firebase-admin');
const app = express();

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Configurar Firebase Admin SDK con las credenciales
const serviceAccount = require('./firebase.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

const loginRouter = require("./routes/login");
app.use("/login", loginRouter);


const tweetRouter = require("./routes/tweet");
app.use("/tweet", tweetRouter);

const profileRouter = require("./routes/profile");
app.use("/", profileRouter);

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



// Escuchar en un puerto
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} :)`);
});
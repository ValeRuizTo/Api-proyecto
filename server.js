const admin = require('firebase-admin');
const express = require("express");
const cors = require('cors'); // Importa el paquete cors

const app = express();

/* Configuración del middleware CORS
app.use(cors({
  origin: 'http://localhost:5175',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
*/
const allowedOrigins = ['http://localhost:5173', 'https://social-garden.vercel.app'];

app.use(cors({
  origin: function(origin, callback) {
    // Verifica si la solicitud proviene de una de las URLs permitidas
    const isAllowed = allowedOrigins.includes(origin);
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.urlencoded({ extended: true })); // para acceder al body
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

const tweetRouter = require("./routes/newtweet");
app.use("/newtweet", tweetRouter);

const profileRouter = require("./routes/profile");
app.use("/profile", profileRouter);

const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

const tweetsRouter = require("./routes/tweets");
app.use("/tweets", tweetsRouter);



app.get("/", (req, res) => {
  res.send("I'm working :)");
});

app.all('*', (req, res) => {
  res.status(404).send("Error 404");
});

// Escuchar en un puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} `);
});

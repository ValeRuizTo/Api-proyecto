const admin = require('firebase-admin');
const express = require("express");
const app = express();
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


const tweetRouter = require("./routes/tweet");
app.use("/tweet", tweetRouter);

const profileRouter = require("./routes/profile");
app.use("/", profileRouter);

const searchRouter = require("./routes/search");
app.use("/search", searchRouter);

app.get("/", (req, res) => {
  res.send("Im working :)");
});

app.all('*', (req, res) => {
  res.status(404).send("Error 404");
});




// Escuchar en un puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} :)`);
});
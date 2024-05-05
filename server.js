const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json());

// Routes
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const tweetRoute = require('./routes/tweet');
const profileRoute = require('./routes/profile');





app.use('/register', registerRoute);
app.use(logger);

app.use('/login', loginRoute);
app.use(logger);

app.use('/profile', profileRoute);
app.use(logger);


app.use('/tweet', tweetRoute);
app.use(logger);

// URL - Callback
app.get("/", customLogger, (req, res) => {
  res.send("Im working :)\n Valentina Ruiz");
});

// MiddlewareS
function logger(req, res, next) {
  console.log(req.originalUrl + "from logger");
  next();
}

function customLogger(req, res, next) {
  console.log(req.originalUrl + "from custom logger");
  next();
}

app.listen(5000, () => {
  console.log("Server running on port 3000");
});
module.exports = app; 


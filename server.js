const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json());

// Routes
const usersRouter = require("./routes/users");
const coinRouter = require("./routes/coin");


app.use("/coin", coinRouter);
app.use(logger);


app.use("/users", usersRouter);
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


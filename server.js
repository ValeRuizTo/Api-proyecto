const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json());

// Routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");





app.use("/register", registerRouter);
app.use(logger);


app.use("/login", registerRouter);
app.use(logger);




// URL - Callback
app.get("/", customLogger, (req, res) => {
  res.send("Im working :)");
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


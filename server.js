const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // para acceder al body
app.use(express.json());

// Routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const tweetRouter = require("./routes/tweet");
const profileRouter = require("./routes/profile");




app.use("/profile", profileRouter);
app.use(logger);


app.use("/register", registerRouter);
app.use(logger);


app.use("/login", loginRouter);
app.use(logger);

app.use("/tweet", tweetRouter);
app.use(logger);
//imprime la ruta en la consola


// URL - Callback
app.get("/", customLogger, (req, res) => {
  res.send("Im working :)");
});


app.listen(5000, () => {
  console.log("Server running on port 3000");
});
module.exports = app; 


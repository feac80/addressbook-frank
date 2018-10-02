const express = require("express");
const app = express();
const usersRoute = require("./routes/api/users");
const morgan = require("morgan");
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");

//conecting to the db
mongoose.connect(
  db,
  { useNewUrlParser: true }
);

//middleware to log the request in console.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
//configuration strategy in password

require("./config/passport")(passport);
//middleware to filter route.
app.use("/api/users", usersRoute);

//middleware to handle error (404)
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The server is up and running in port:${port}`);
});

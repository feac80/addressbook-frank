const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const usersRoute = require("./routes/api/users");
const usersContacts = require("./routes/api/contacts");
const morgan = require("morgan");
const mongodb = require("./config/mongodb");
const bodyParser = require("body-parser");

//conecting to the mongo database
mongodb();

//middleware to log the http request in console and parse the income request.
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//middleware to filter routes.
app.use("/api/users", usersRoute);
app.use("/api/contacts", usersContacts);

//middleware to handle unknown routes and send 404
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
//middleware to handle errors and send status 500
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

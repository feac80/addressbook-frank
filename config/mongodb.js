const mongoose = require("mongoose");
//let config = require("config");

mongoose
  .connect(
    process.env.NODE_ENV.trim() === "test"
      ? process.env.MONGOURI_TEST
      : process.env.MONGOURI_DEV,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log(`Connected to ${process.env.NODE_ENV}database`);
  })
  .catch(err => console.log(err));

const mongoose = require("mongoose");
const dbmongo = require("./keys").mongoURI;

console.log(process.env.NODE_ENV);
console.log(process.env.MONGOURI_DEV);
console.log(process.env.NODE_ENV == "test");
console.log(process.env.MONGOURI_TEST);

let currentdb = "";

if (process.env.NODE_ENV === "test") {
  currentdb = process.env.MONGOURI_TEST;
} else {
  currentdb = process.env.MONGOURI_DEV;
}

console.log(currentdb);
module.exports = () => {
  mongoose
    .connect(
      currentdb,
      { useNewUrlParser: true }
    )
    .then(() => {
      console.log("DB connected");
    })
    .catch(err => console.log(err));
};

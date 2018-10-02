const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true); // avoid DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
    // validate: {
    //   isAsync: false,
    //   //validator: validator.isEmail,
    //   message: "{VALUE} is not a valid email"
    // }
  },
  password: {
    type: String,
    required: true
  }
});

// var userSchema = new mongoose.Schema({
// 	email: {
// 	type: String,
// 	required: true,
// 	trim: true,
// 	minlength: 1,
// 	unique: true,
// 	validate: {
// 	isAsync: false,
// 	validator: validator.isEmail,
// 	message: '{VALUE} is not a valid email'
// 	}
// 	},

module.exports = mongoose.model("User", userSchema);

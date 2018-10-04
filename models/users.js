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
    minlength: 1,
    match: /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
  },
  password: {
    type: String,
    required: true
    // trim: true,
    // minlength: 4,
    // maxlength: 8

    // 		match: /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,15}$/
    // // 		Password must contain at least one letter, at least one number, and be longer than six charaters.
    // // Matches
    // // a1b2c3 | abcdefg123 | 12345a
    // // Non-Matches
    // // abcdefghij | 1234567890
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

//$2a$10$HyitYrGlMOHC.z8zACNzDu2iSPCc/erP4/h9Dknsmxm6DdOjjRLmK

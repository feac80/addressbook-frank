const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true); // avoid DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 40
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1,
    maxlength: 40
  },
  password: {
    type: String,
    required: true
  },
  createdDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");
const User = require("../models/users");

//ifprocess.env.NODE_ENV.trim() === "test";
after(function(done) {
  User.remove({}, err => {
    done();
  });
});

// mongoose.connect('mongodb://localhost/db-test', function(){
// 	mongoose.connection.db.dropDatabase(function(){
// 			done()

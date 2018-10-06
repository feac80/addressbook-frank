const mongoose = require("mongoose");

const userData = {
  name: "Frank Eduardo",
  email: "feac80@hotmail.com",
  password: "password"
};

db = "mongodb://feac80:13267095Qs@ds123513.mlab.com:23513/addressbook-test";

// before (function(done){
// 	mongoose
// 	.connect(
// 		db,
// 		{ useNewUrlParser: true }
// 	)
// 	.then(() => {
// 		console.log("DB connected in Test");
// 		done()
// 	})
// 	.catch(err => console.log(err));

// })

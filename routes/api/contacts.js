const express = require("express");
const router = express.Router();
const firebase = require("../../config/firebase");
const passport = require("passport");
//const checkHeader = require("../../middleware/checkHeader");
const jwt = require("jsonwebtoken");

//const ExtractJwt = require("passport-jwt").ExtractJwt;

// Get a database reference to our AddressBook
// var db = admin.database();
// var ref = db.ref("server/saving-data/serverbook");

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    // var userEmail = req.body.user_email;
    // check header or url parameters or post parameters for token

    //const token = req.header.authorization;
    const token = req.headers.authorization;
    console.log(token);
    var decoded = jwt.decode(token);
    console.log(decoded.header);
    console.log(decoded.payload);
    // req.body.token ||
    // req.query.token ||
    // req.headers["Authorization"] ||
    // req.body["Conten-Type"];
    console.log(token);

    // const uid = token;
    // const ref = firebase
    //   .database()
    //   .ref()
    //   .child("usersuid/" + uid);
    // const data = req.body;
    // ref.push(data, err => {
    //   if (err) {
    //     res.send(err);
    //   } else {
    //     res.json({ message: "Success: User Save.", result: true });
    //   }
    // });
  }
);

module.exports = router;

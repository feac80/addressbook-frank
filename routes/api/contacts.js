const express = require("express");
const router = express.Router();
const firebase = require("../../config/firebase");
const passport = require("passport");
const isLoggedIn = require("../../middleware/isLoggedIn");
//const jwt = require("jsonwebtoken");

//const ExtractJwt = require("passport-jwt").ExtractJwt;

// Get a database reference to our AddressBook
// var db = admin.database();
// var ref = db.ref("server/saving-data/serverbook");

router.post(
  "/new",
  isLoggedIn,

  (req, res) => {
    // const userEmail = req.body.user_email;
    // check header or url parameters or post parameters for token
    //const token = req.header.authorization;
    // const uid = decodedToken.id;
    const uid = req.userData.id;
    console.log("here" + uid);
    const ref = firebase
      .database()
      .ref()
      .child("usersuid/" + uid);
    const data = req.body;
    ref.push(data, err => {
      if (err) {
        res.send(err);
      } else {
        res.json({ message: "Success: Contact Created.", result: true });
      }
    });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const firebase = require("../../config/firebase");
const isLoggedIn = require("../../middleware/isLoggedIn");
const isContactValid = require("../../middleware/isContactValid");

router.post(
  "/",

  isLoggedIn,
  isContactValid,

  (req, res) => {
    // const userEmail = req.body.user_email;
    // check header or url parameters or post parameters for token
    //const token = req.header.authorization;
    // const uid = decodedToken.id;

    //contactData
    // const ref = firebase
    //   .database()
    //   .ref()
    //   .child("usersuid/" + uid);

    firebase
      .database()
      .ref()
      .push(req.contactData, err => {
        if (!err) {
          res.status(201).json({
            message: "Success: Created Contact.",
            result: true
          });
        } else {
          res.status(500).json({
            message: "Something went wrong",
            errormessage: err.mesage
          });
        }
      });
  }
);

module.exports = router;

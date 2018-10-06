const express = require("express");
const router = express.Router();
const firebase = require("../../config/firebase");
const isLoggedIn = require("../../middleware/isLoggedIn");

router.post(
  "/",
  isLoggedIn,

  (req, res) => {
    // const userEmail = req.body.user_email;
    // check header or url parameters or post parameters for token
    //const token = req.header.authorization;
    // const uid = decodedToken.id;
    const uid = req.userData.id;
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

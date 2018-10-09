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
    const newContact = firebase
      .database()
      .ref()
      .push(req.contactData, err => {
        if (!err) {
          res.status(201).json({
            message: "Success: Created Contact.",
            name: req.contactData.name,
            surname: req.contactData.surname,
            phone: req.contactData.phone,
            address: req.contactData.address,
            email: req.contactData.address
          });
        } else {
          res.status(500).json({
            message: "Something went wrong",
            errormessage: err.mesage
          });
        }
        //const postId = newContact.key;
        // console.log(postId);
        // console.log(req.contactData.user_id);
      });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

//@route: POST api/users/register
//@CRUD:  Create
//@Access Public
//@Desc:  Create a new User
router.post("/register", (req, res) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        res.status(500).json({
          message: "Something went wrong",
          errormessage: err.message
        });
      } else {
        const newUser = new User({
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          password: req.body.password
        });
        newUser.password = hash;
        newUser
          .save()
          .then(user =>
            res.status(201).json({
              name: user.name,
              surname: user.surname,
              email: user.email
            })
          )
          .catch(err => {
            res.status(500).json({
              message: "Something went wrong",
              errormessage: err.message
            });
          });
      }
    });
  });
});
//@route: POST api/users/login
//@CRUD:  N/A
//@Access Public
//@Desc:  Login User
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        console.log(user);
        res.status(401).json({
          error: "Auth Failed"
        });
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            //User Matched
            const payload = { id: user.id, name: user.name, email: user.email };
            jwt.sign(
              payload,
              process.env.SERCRET_OR_KEY,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.status(400).json({ password: "Password Incorrect" });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Something went wrong",
        errormessage: err.message
      });
    });
});

router.post("/test", (req, res) => {
  const passwordValidator = require("password-validator");

  // Create a schema
  var schema = new passwordValidator();

  // Add properties to it
  schema
    .is()
    .min(6) // Minimum length 6
    .is()
    .max(25) // Maximum length 25
    .has()
    .uppercase(1) // Must have uppercase letters
    .has()
    .lowercase(1) // Must have lowercase letters
    .has()
    .digits(1) // Must have digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

  if (schema.validate(req.body.password, { list: true })) {
    res.status(202).json({
      message: "Password ok"
    });
  } else {
    res.status(500).json({
      message: "Password is not correct"
    });
  }
});
module.exports = router;

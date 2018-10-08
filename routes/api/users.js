const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const validator = require("express-validator");
const isUserDataValid = require("../../middleware/isUserDataValid");

//@route: POST api/users/register
//@CRUD:  Create
//@Access Public
//@Desc:  Create a new User

router.post("/register", isUserDataValid, (req, res) => {
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
          email: req.body.email,
          password: req.body.password
        });
        newUser.password = hash;
        newUser
          .save()
          .then(user =>
            res.status(201).json({
              message: "Success: Created User",
              name: user.name,
              email: user.email,
              createdDate: user.createdDate
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
router.post("/login", isUserDataValid, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.status(401).json({
          message: "Something went wrong ",
          errormessage: "Auth Failed"
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
                  message: "Success: Authenticaded User",
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res.status(401).json({
              message: "Something went wrong",
              errormessage: "Unauthorized User"
            });
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

module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

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
              keys.secretOrKey,
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

//@route: DELETE api/users/:userId
//@CRUD:  Delete
//@Access private
//@Desc:  Delete user by ID
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.deleteOne({ _id: req.params.userId })
      .then(result => {
        res.status(200).json({
          message: "User deleted"
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Something went wrong",
          errormessage: err.message
        });
      });
  }
);

module.exports = router;

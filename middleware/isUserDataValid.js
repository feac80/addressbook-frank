const Joi = require("joi");

module.exports = (req, res, next) => {
  const userValidateSchema = Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string()
        .email({ minDomainAtoms: 2 })
        .required(),
      password: Joi.string()
        .regex(/^.*(?=.{6,15})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$@%&? "]).*$/)
        .required()
    })
    .with("email", "password");
  // It expects at least
  // 1 special character !#$@%&?
  // 1 letter,
  // 1 digit,
  //the length should be between 6-15 characters. The sequence of the characters is not important.
  // Matches
  // 1234567Tt#
  // Non-Matches
  // Tt122 | 1tdfy34564646T*

  Joi.validate(req.body, userValidateSchema, (err, value) => {
    if (!err) {
      next();
    } else {
      res.status(422).json({
        message: "Something went wrong",
        error: err.name,
        errormessage: err.details[0].message
      });
    }
  });
};

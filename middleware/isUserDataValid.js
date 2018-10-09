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

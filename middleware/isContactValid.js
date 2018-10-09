const Joi = require("joi");

//name is required
module.exports = (req, res, next) => {
  const uid = req.userData.id;

  contactData = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    user_id: uid,
    phone: req.body.phone,
    address: req.body.address
  };

  const contactValidateSchema = Joi.object().keys({
    name: Joi.string()
      .max(30)
      .required(),
    surname: Joi.string()
      .max(30)
      .required(),
    user_id: Joi.string().required(),
    phone: Joi.string()
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),
    address: Joi.string()
      .max(30)
      .required()
  });

  Joi.validate(contactData, contactValidateSchema, (err, value) => {
    if (!err) {
      req.contactData = contactData;
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

const Joi = require("joi");

//name is required
module.exports = (req, res, next) => {
  const uid = req.userData.id;
  let surname = req.body.surname || "";
  let phone = req.body.phone || "";
  console.log(surname);
  contactData = {
    name: req.body.name,
    surname: surname,
    email: req.body.email,
    user_id: uid,
    phone: phone,
    address: req.body.address
  };

  const contactValidateSchema = Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    surname: Joi.string(),
    user_id: Joi.string(),
    phone: Joi.string(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    address: Joi.string()
  });

  Joi.validate(contactData, contactValidateSchema, (err, value) => {
    if (!err) {
      req.contactData = contactData;
      console.log(value);
      console.log(contactData);
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

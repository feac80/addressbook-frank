const jwt = require("jsonwebtoken");
const key = require("../config/keys").secretOrKey;

module.exports = (req, res, next) => {
  const rawToken = req.headers.authorization;
  const TokenArray = rawToken.split(" ");
  const token = TokenArray[1];

  jwt.verify(token, key, (err, decoded) => {
    if (!err) {
      req.userData = decoded;
      next();
    } else {
      res.status(500).json({
        message: "Something went wrong",
        errormessage: err.message
      });
    }
  });
};

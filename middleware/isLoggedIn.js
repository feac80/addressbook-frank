const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const rawToken = req.headers.authorization;
  const TokenArray = rawToken.split(" ");
  const token = TokenArray[1];
  //verifying the token
  jwt.verify(token, process.env.SERCRET_OR_KEY, (err, decoded) => {
    if (!err) {
      req.userData = decoded;
      next();
    } else {
      res.status(401).json({
        message: "Something went wrong",
        errormessage: err.message
      });
    }
  });
};

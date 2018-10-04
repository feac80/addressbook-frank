const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed"
    });
  }
};

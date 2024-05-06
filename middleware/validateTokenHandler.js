const jwt = require("jsonwebtoken");
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

const authenticateToken = (req, res, next) => {
  const authorization = req.header("Authorization");

  if (!authorization) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden - Invalid token" });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticateToken;

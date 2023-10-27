require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization?.trim().split(" ")[1];
  // console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if (decoded) {
        let userId = decoded.userId;
        req.body.userId = userId;
        next();
      } else {
        return res.status(401).json({ msg: "Unauthorized" });
      }
    });
  } else {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};

module.exports = auth;

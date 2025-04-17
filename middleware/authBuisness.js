const secret = process.env.secret;
const jwt = require("jsonwebtoken");

const authBuisness = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      if (user.role === "business") {
        req.user = user;
        next();
      } else {
        return res.status(401).json({ message: "Role not found" });
      }
    }
  });
};

module.exports.authBuisness = authBuisness;

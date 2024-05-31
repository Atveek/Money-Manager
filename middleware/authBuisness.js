const secret = process.env.secret;
const jwt = require("jsonwebtoken");

const authBuisness = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    console.log("token not found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    } else {
      if (user.role === "business") {
        req.user = user;
        console.log(user);
        next();
      } else {
        console.log("role not found");
        return res.status(401).json({ message: "Unauthorized" });
      }
    }
  });
};

module.exports.authBuisness = authBuisness;

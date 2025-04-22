const express = require("express");
const {
  loginController,
  registerController,
  totalcustomer,
  totalsupplier,
  verifyEmail,
} = require("../controllers/userController");
const { authBuisness } = require("../middleware/authBuisness");
//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);
router.get("/customer", authBuisness, totalcustomer);
router.get("/supplier", authBuisness, totalsupplier);
router.post("/verify-email", verifyEmail);


module.exports = router;

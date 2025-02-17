const userModel = require("../models/userModel");
const customerModel = require("../models/customerModel");
const supplierModel = require("../models/supplierModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.secret;

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { userid: user._id, email: user.email, role: user.role },
          secret
        );
        res.status(200).json({
          success: true,
          user,
          token,
        });
      } else {
        console.log("Password does not match");
        res.status(401).json({ error: "Invalid username or password." });
      }
    } else {
      console.log("User not found");
      res.status(404).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
};

async function totalcustomer(req, res) {
  try {
    const user = req.user.userid;
    const newUser = await userModel
      .find({ _id: user })
      .select({ customers: 1 });
    console.log(newUser);
    const customerList = [];
    for (const customer of newUser[0].customers) {
      console.log(customer);
      const customerDetail = await customerModel.find({ _id: customer });
      customerList.push({ ...customerDetail });
    }
    res.status(201).json({
      success: true,
      customerList,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
}
async function totalsupplier(req, res) {
  try {
    const user = req.user.userid;
    const newUser = await userModel
      .find({ _id: user })
      .select({ suppliers: 1 });
    console.log(newUser);
    const supplierList = [];
    for (const supplier of newUser[0].suppliers) {
      console.log(supplier);
      const supplierDetail = await supplierModel.find({ _id: supplier });
      supplierList.push({ ...supplierDetail });
    }
    res.status(201).json({
      success: true,
      supplierList,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: "Bad Request" });
  }
}

module.exports = {
  loginController,
  registerController,
  totalcustomer,
  totalsupplier,
};

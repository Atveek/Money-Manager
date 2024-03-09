const customerModel = require("../models/customerModel");
const userModel = require("../models/userModel");

async function AddCustomer(req, res) {
  try {
    const userId = req.user.userid;
    const newCustomer = new customerModel(req.body);
    const savedCustomer = await newCustomer.save();

    // Fetch the user document
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add the new customer to the beginning of the user's `customers` array
    user.customers.unshift(savedCustomer._id);
    await user.save();

    console.log("New Customer Added:", savedCustomer);
    console.log("Updated User Document:", user);

    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = AddCustomer;

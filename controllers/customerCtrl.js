const customerModel = require("../models/customerModel");
const userModel = require("../models/userModel");

async function AddCustomer(req, res) {
  try {
    const userId = req.user.userid;
    const newCustomer = new customerModel(req.body);
    const savedCustomer = await newCustomer.save();

    // Fetch the user document
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $push: { customers: savedCustomer._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json(savedCustomer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = AddCustomer;

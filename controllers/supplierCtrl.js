const supplierModel = require("../models/supplierModel");
const userModel = require("../models/userModel");

async function Addsupplier(req, res) {
  try {
    const userId = req.user.userid; // Assuming `userid` is the correct property name to get the user ID
    const newsupplier = new supplierModel(req.body); // Create a new supplier object
    const savedsupplier = await newsupplier.save(); // Save the new supplier to the database
    console.log(savedsupplier);
    await userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { suppliers: savedsupplier._id } }, // Add the newly created supplier's ID to the user's `suppliers` array
      { new: true } // Ensure that the updated user document is returned
    );
    res.status(201).json(savedsupplier); // Return the saved supplier in the response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
}

module.exports = Addsupplier;

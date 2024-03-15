const mongoose = require("mongoose");

//schema design
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required and should be unique"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    customers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer",
      },
    ],
    suppliers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
      },
    ],
    role: {
      type: String,
      enum: ["personal", "business"],
      required: true,
    },
  },
  { timestamps: true }
);

//export
const userModel = mongoose.model("User", userSchema); // Changed "users" to "User" for singular naming convention
module.exports = userModel;

const mongoose = require("mongoose");

//schema design
const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    phone: {
      type: Number,
      required: [true, "Number is required"],
    },
    transections: [
      {
        transection: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "transection",
        },
      },
    ],
  },
  { timestamps: true }
);

//export
const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;

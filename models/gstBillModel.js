const mongoose = require("mongoose");

const gstBillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },

    customerNo: {
      type: Number,
    },
    name: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    items: [
      {
        itemName: {
          type: String,
        },
        quantity: {
          type: Number,
        },
        discount: {
          type: Number,
        },
        amount: {
          type: Number,
        },
        gstPer: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    totalDiscount: {
      type: Number,
    },
    totalGstAmount: {
      type: Number,
    },
    transactionId: {
      type: mongoose.Types.ObjectId,
      ref: "transections",
    },
  },
  {
    timestamps: true,
  }
);

const gstBillModel = mongoose.model("gstBill", gstBillSchema);

module.exports = gstBillModel;

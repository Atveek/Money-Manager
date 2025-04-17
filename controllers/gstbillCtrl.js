const { Mongoose, Types } = require("mongoose");
const customerModel = require("../models/customerModel");
const gstBillModel = require("../models/gstBillModel");
const transectionModel = require("../models/transectionModel");
const userModel = require("../models/userModel");

const gstCalculator = (items) => {
  let totalAmount = 0,
    totalDiscount = 0,
    totalGstAmount = 0;

  items.map((item) => {
    let discountAmount = ((item.amount * item.discount) / 100) * item.quantity;
    let amount = item.amount * item.quantity - discountAmount;

    let gstAmount = (amount * item.gstPer) / 100;
    amount += gstAmount;

    totalDiscount += discountAmount;
    totalGstAmount += gstAmount;
    totalAmount += amount;
  });

  return { totalAmount, totalDiscount, totalGstAmount };
};

const createBills = async (req, res) => {
  const userId = req.user.userid;
  const { customerNo, name, items } = req.body;
  try {
    const { totalAmount, totalDiscount, totalGstAmount } = gstCalculator(items);

    const bill = new gstBillModel({
      userId,
      customerNo,
      name,
      items,
      totalAmount,
      totalDiscount,
      totalGstAmount,
    });

    await bill.save();

    let customer = await customerModel.aggregate([
      {
        $match: { phone: customerNo },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "customers",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $match: {
          "user._id": Types.ObjectId(userId),
        },
      },
    ]);

    let addNewCustomer;
    if (!customer || customer.length < 1) {
      addNewCustomer = await new customerModel({
        name: name,
        phone: customerNo,
        email: "",
        transections: [],
      }).save();

      await userModel.findOneAndUpdate(
        { _id: userId },
        { $addToSet: { customers: addNewCustomer._id } },
        { new: true }
      );
    }

    if (customer || addNewCustomer) {
      if (addNewCustomer) {
        customer = [addNewCustomer];
      }

      const transaction = new transectionModel({
        userid: userId,
        amount: totalAmount,
        type: "earn",
        refrence: items[0].itemName,
        description: items[0].itemName,
        date: Date(),
      });
      await transaction.save();

      bill.transactionId = transaction._id;
      await bill.save();

      const addTransaction = await customerModel.findOneAndUpdate(
        { _id: customer[0]._id },
        { $addToSet: { transections: transaction._id } },
        { new: true }
      );
    }

    res.status(200).json({
      message: {
        bill,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBills = async (req, res) => {
  const userId = req.user.userid;
  const id = req.params.id;
  const { customerNo, name, items } = req.body;

  try {
    // Step 1: Find the existing bill
    const bill = await gstBillModel.findById(id);
    if (!bill) {
      return res.status(400).json({ message: "Please provide valid bill ID" });
    }

    // Step 2: Recalculate totals
    const { totalAmount, totalDiscount, totalGstAmount } = gstCalculator(items);

    // Step 3: Update the bill
    bill.customerNo = customerNo;
    bill.name = name;
    bill.items = items;
    bill.totalAmount = totalAmount;
    bill.totalDiscount = totalDiscount;
    bill.totalGstAmount = totalGstAmount;
    await bill.save();

    // Step 4: Update related transaction if exists
    if (bill.transactionId) {
      const transaction = await transectionModel.findById(bill.transactionId);
      if (transaction) {
        transaction.amount = totalAmount;
        transaction.refrence = items[0].itemName;
        transaction.description = items[0].itemName;
        transaction.date = Date();
        await transaction.save();
      }
    }

    res.status(200).json({
      message: {
        bill,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBills = async (req, res) => {
  const userId = req.user.userid;
  try {
    const bills = await gstBillModel.find({
      userId,
    });

    if (!bills) {
      return res.status(400).json("Please create one bill");
    }

    return res.status(200).json({ bills });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBillsById = async (req, res) => {
  const userId = req.user.userid;
  try {
    const { id } = req.params;
    const bills = await gstBillModel.find({ _id: id, userId });

    if (!bills) {
      return res.status(400).json("Please create one bill");
    }

    return res.status(200).json({ bills });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBills, getAllBills, getBillsById, updateBills };

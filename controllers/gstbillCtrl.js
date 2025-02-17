const gstBillModel = require("../models/gstBillModel");

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

    console.log(userId);

    const bill = await gstBillModel({
      userId,
      customerNo,
      name,
      items,
      totalAmount,
      totalDiscount,
      totalGstAmount,
    });

    await bill.save();

    res.status(200).json({
      message: {
        bill,
      },
    });
  } catch (err) {
    console.log("Error in  create Bill function", err);
    res.status(500).json("Internal server error");
  }
};
const updateBills = async (req, res) => {
  const id = req.params.id;
  const { customerNo, name, items } = req.body;

  try {
    // Find the existing bill
    const bill = await gstBillModel.findById(id);
    if (!bill) {
      return res.status(400).json({ message: "Please provide valid details" });
    }

    // Update bill fields
    bill.customerNo = customerNo;
    bill.name = name;
    bill.items = items;

    // Recalculate totals
    const { totalAmount, totalDiscount, totalGstAmount } = gstCalculator(items);
    bill.totalAmount = totalAmount;
    bill.totalDiscount = totalDiscount;
    bill.totalGstAmount = totalGstAmount;

    // Save the updated bill
    await bill.save();

    res.status(200).json({
      message: {
        bill,
      },
    });
  } catch (err) {
    console.error("Error in updateBills function", err);
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
    console.log("Error in get all Bill function", err);
    res.status(500).json("Internal server error");
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
    console.log("Error in get all Bill function", err);
    res.status(500).json("Internal server error");
  }
};

module.exports = { createBills, getAllBills, getBillsById, updateBills };

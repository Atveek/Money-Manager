const customerModel = require("../models/customerModel");
const transectionModel = require("../models/transectionModel");
const moment = require("moment");
const userModel = require("../models/userModel");
const supplierModel = require("../models/supplierModel");

const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(erorr);
  }
};

// const deleteTransection = async (req, res) => {
//   try {
//     await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
//     res.status(200).send("Transaction Deleted!");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

async function deleteTransection(req, res) {
  try {
    const transactionId = req.body.transacationId; // Corrected variable name
    console.log(transactionId);
    const transaction = await transectionModel.findById({ _id: transactionId }); // Changed find to findById to directly find by ID
    if (!transaction) {
      return res.status(404).send("Transaction not found");
    }

    const user = await userModel.findById({ _id: transaction.userid }); // Changed find to findById to directly find by ID
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (user.role === "business") {
      const customerId = req.headers["customerid"];
      const supplierId = req.headers["supplierid"];
      if (customerId) {
        await customerModel.findByIdAndUpdate(customerId, {
          $pull: { transections: transactionId }, // Changed $unset to $pull to remove the transaction ID from the array
        });
      }
      if (supplierId) {
        await supplierModel.findByIdAndUpdate(supplierId, {
          $pull: { transections: transactionId }, // Changed $unset to $pull to remove the transaction ID from the array
        });
      }
    }

    await transectionModel.findOneAndDelete({ _id: req.body.transacationId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}
// const editTransection = async (req, res) => {
//   try {
//     console.log(req.body.transacationId);
//     const result = await transectionModel.findOneAndUpdate(
//       { _id: req.body.transacationId },
//       req.body.payload
//     );
//     console.log(result);
//     res.status(200).send("Edit SUccessfully");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };

const editTransection = async (req, res) => {
  try {
    const transactionId = req.body.transacationId; // Corrected variable name
    const payload = req.body.payload; // Corrected variable name
    console.log(transactionId);
    console.log(payload);

    const result = await transectionModel.findOneAndUpdate(
      { _id: transactionId },
      payload, // Used the payload directly without wrapping it in an object
      { new: true } // Added { new: true } to return the updated document
    );
    console.log(result);
    if (!result) {
      return res.status(404).send("Transaction not found"); // Added check if the transaction doesn't exist
    }
    res.status(200).send("Edit Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const addTransection = async (req, res) => {
  try {
    // const newTransection = new transectionModel(req.body);
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

async function addCustomerTransaction(req, res) {
  try {
    const userid = req.user.userid;
    console.log(userid);
    const customerid = req.headers["customerid"];
    console.log(customerid);
    const newTransaction = new transectionModel({
      userid: userid,
      ...req.body, // Spread the request body to populate other fields
    });
    const result = await newTransaction.save();

    await customerModel.findByIdAndUpdate(
      customerid,
      { $addToSet: { transections: result._id } },
      { new: true }
    );

    res.status(201).send("Transaction Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function getCustomerTransaction(req, res) {
  try {
    const customerid = req.headers["customerid"];

    const customer = await customerModel.findById(customerid);

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    const transectionList = [];
    for (const transectionId of customer.transections) {
      const transectionDetail = await transectionModel.findById(transectionId);
      if (transectionDetail) {
        transectionList.unshift(transectionDetail);
      }
    }

    res.send(transectionList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function addSupplierTransaction(req, res) {
  try {
    const userid = req.user.userid;
    console.log(userid);
    const supplierid = req.headers["supplierid"];
    console.log(supplierid);
    const newTransaction = new transectionModel({
      userid: userid,
      ...req.body, // Spread the request body to populate other fields
    });
    const result = await newTransaction.save();
    await supplierModel.findByIdAndUpdate(
      supplierid,
      { $addToSet: { transections: result._id } },
      { new: true }
    );
    res.status(201).send("Transaction Created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

async function analyser(req, res) {
  try {
    const userId = req.user.userid;
    const lastFiveMonths = new Array(6).fill(0).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - index);
      return date;
    });

    const monthlyDataArray = [];

    for (const date of lastFiveMonths) {
      const year = date.getFullYear();
      const month = date.getMonth(); // 0-based

      const firstDayOfMonth = new Date(year, month, 1);
      const lastDayOfMonth = new Date(year, month + 1, 0);

      const transactions = await transectionModel.find({
        type: { $in: ["gave", "earn"] },
        userid: userId,
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      });

      const earnAmount = transactions
        .filter((tx) => tx.type === "earn")
        .reduce((total, tx) => total + tx.amount, 0);

      const gaveAmount = transactions
        .filter((tx) => tx.type === "gave")
        .reduce((total, tx) => total + tx.amount, 0);

      const totalAmount = earnAmount - gaveAmount;

      monthlyDataArray.push({
        month: month + 1,
        year,
        value: totalAmount >= 0 ? earnAmount : gaveAmount,
      });
    }

    // Sort by year and then month
    monthlyDataArray.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    // Convert to object with "MM-YYYY": value
    const sortedMonthlyData = {};
    monthlyDataArray.forEach(({ month, year, value }) => {
      sortedMonthlyData[`${month}-${year}`] = value;
    });

    res.json(sortedMonthlyData);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
}

async function getSupplierTransaction(req, res) {
  try {
    const supplierid = req.headers["supplierid"];

    const supplier = await supplierModel.findById(supplierid);

    if (!supplier) {
      return res.status(404).send("supplier not found");
    }

    const transectionList = [];
    for (const transectionId of supplier.transections) {
      const transectionDetail = await transectionModel.findById(transectionId);
      if (transectionDetail) {
        transectionList.unshift(transectionDetail);
      }
    }

    res.send(transectionList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}
async function profit(req, res) {
  try {
    const userId = req.user.userid;
    const lastFiveMonths = new Array(12).fill(0).map((_, index) => {
      const date = new Date();
      date.setMonth(date.getMonth() - index);
      return date;
    });

    const monthlyData = {};
    for (const date of lastFiveMonths) {
      const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const lastDayOfMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      );

      const transactions = await transectionModel.find({
        userid: userId,
        date: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
      });
      const totalAmount = transactions.reduce(
        (total, transaction) =>
          total +
          (transaction.type === "gave"
            ? +transaction.amount
            : -transaction.amount),
        0
      );

       // CUSTOMER DATA
      const customerGave = transactions
        .filter(tx => tx.type === "gave")
        .reduce((total, tx) => total + tx.amount, 0);

      const customerEarn = transactions
        .filter(tx => tx.type === "earn")
        .reduce((total, tx) => total + tx.amount, 0);
      

      const customeramout = customerEarn - customerGave >= 0 ? customerEarn : customerGave;

       const supplierGive = transactions
        .filter(tx => tx.type === "give")
        .reduce((total, tx) => total + tx.amount, 0);

      const supplierGot = transactions
        .filter(tx => tx.type === "got")
        .reduce((total, tx) => total + tx.amount, 0);
      
      const supplieramount = (supplierGot -supplierGive ) >=0 ?supplierGot :supplierGive
      monthlyData[`${date.getMonth() + 1}-${date.getFullYear()}`] = {
        ptofit: customeramout-supplieramount,
        customeramout: customeramout,
        supplieramount: supplieramount,
      };
    }

    res.json(monthlyData);
  } catch (err) {
    res.status(500).send("Internal Server Error");
    console.log(err);
  }
}

module.exports = {
  getAllTransection,
  addTransection,
  editTransection,
  profit,
  deleteTransection,
  addCustomerTransaction,
  getCustomerTransaction,
  addSupplierTransaction,
  getSupplierTransaction,
  analyser,
};

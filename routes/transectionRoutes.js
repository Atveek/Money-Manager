const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
  addCustomerTransaction,
  getCustomerTransaction,
  addSupplierTransaction,
  getSupplierTransaction,
  analyser,
  profit,
} = require("../controllers/transectionCtrl");
const { authBuisness } = require("../middleware/authBuisness");

//router object
const router = express.Router();

//routes
//add transection POST MEthod
router.post("/add-transection", addTransection);
//Edit transection POST MEthod
router.post("/edit-transection", editTransection);
//Delete transection POST MEthod
router.post("/delete-transection", deleteTransection);

//get transections
router.post("/get-transection", getAllTransection);

//business
router.post("/customer/transection", authBuisness, addCustomerTransaction);
router.get("/customer/transection", authBuisness, getCustomerTransaction);
router.post("/supplier/transection", authBuisness, addSupplierTransaction);
router.get("/supplier/transection", authBuisness, getSupplierTransaction);

// Assuming you have a route for retrieving transactions
router.get("/analyser", authBuisness, analyser);
router.get("/profit", authBuisness, profit);

module.exports = router;

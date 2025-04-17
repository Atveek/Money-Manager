const express = require("express");
const { authBuisness } = require("../middleware/authBuisness");
const {
  createBills,
  getAllBills,
  getBillsById,
  updateBills,
} = require("../controllers/gstbillCtrl");
const route = express.Router();

route.post("/create-bill", authBuisness, createBills);
route.get("/", authBuisness, getAllBills);
route.get("/:id", authBuisness, getBillsById);
route.put("/:id", authBuisness, updateBills);

module.exports = route;

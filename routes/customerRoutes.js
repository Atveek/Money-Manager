const express = require("express");
const { authBuisness } = require("../middleware/authBuisness");
const route = express.Router();
const AddCustomer = require("../controllers/customerCtrl");

route.post("/addCustomer", authBuisness, AddCustomer);

module.exports = route;

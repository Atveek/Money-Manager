const express = require("express");
const { authBuisness } = require("../middleware/authBuisness");
const route = express.Router();
const Addsupplier = require("../controllers/supplierCtrl");

route.post("/addSupplier", authBuisness, Addsupplier);

module.exports = route;

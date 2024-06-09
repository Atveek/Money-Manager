const express = require("express");
const router = express.Router();
const json2csv = require("json2csv").parse;
const pdf = require("html-pdf");
const fs = require("fs");
const transectionModel = require("../models/transectionModel");
const customerModel = require("../models/customerModel");
const supplierModel = require("../models/supplierModel");
const puppeteer = require("puppeteer");

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (adding 1 because January is 0) and pad with leading zero if necessary
  const year = date.getFullYear(); // Get last two digits of the year
  return `${year}-${month}-${day}`; // Return formatted date string
}

// Endpoint to handle downloading transactions as CSV
router.get("/csv", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const startDateObj = startDate ? startDate : null;
    const endDateObj = endDate ? endDate : null;
    console.log(startDate, endDate);
    const customerId = req.headers.customerid;
    const supplierId = req.headers.supplierid;

    console.log("customerId:", customerId);
    console.log("supplierId:", supplierId);
    let transactions = [];

    if (customerId) {
      const customer = await customerModel.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      console.log(customer.transections);
      transactions = await Promise.all(
        customer.transections.map(async (transactionId) => {
          const transaction = await transectionModel.findById({
            _id: transactionId,
          });
          if (
            transaction &&
            ((!startDateObj && !endDate) ||
              (!startDateObj && formatDate(transaction.date) === endDateObj) ||
              (startDateObj && formatDate(transaction.date) >= startDateObj)) &&
            ((!startDateObj && !endDate) ||
              (!endDateObj && formatDate(transaction.date) === startDateObj) ||
              (endDateObj && formatDate(transaction.date) <= endDateObj))
          ) {
            return transaction;
          }
        })
      );
      console.log(transactions);
      console.log("Costomer clear");
    } else if (supplierId) {
      const supplier = await supplierModel.findById(supplierId);
      if (!supplier) {
        return res.status(404).json({ error: "supplier not found" });
      }
      console.log(supplier.transections);
      transactions = await Promise.all(
        supplier.transections.map(async (transactionId) => {
          const transaction = await transectionModel.findById({
            _id: transactionId,
          });
          if (
            transaction &&
            ((!startDateObj && !endDate) ||
              (!startDateObj && formatDate(transaction.date) === endDateObj) ||
              (startDateObj && formatDate(transaction.date) >= startDateObj)) &&
            ((!startDateObj && !endDate) ||
              (!endDateObj && formatDate(transaction.date) === startDateObj) ||
              (endDateObj && formatDate(transaction.date) <= endDateObj))
          ) {
            return transaction;
          }
        })
      );
      console.log("Supplier Clear");
    } else {
      return res
        .status(400)
        .json({ error: "supplier or supplier ID not provided" });
    }

    const filteredTransactions = transactions.filter(
      (transaction) => transaction
    );

    const fields = ["description", "refrence", "date", "amount", "type"];
    const csv = json2csv(filteredTransactions, { fields });
    // const csv = json2csv(filteredTransactions);

    res.setHeader(
      "Content-disposition",
      "attachment; filename=transactions.csv"
    );
    res.set("Content-Type", "text/csv");
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error downloading CSV file:", error);
    res.status(500).json({ error: "Error downloading CSV file" });
  }
});

// Endpoint to handle downloading transactions as PDF
// Endpoint to handle downloading transactions as PDF

router.get("/pdf", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const startDateObj = startDate ? startDate : null;
    const endDateObj = endDate ? endDate : null;
    const customerId = req.headers.customerid;
    const supplierId = req.headers.supplierid;
    let transactions = [];
    let customer;
    let supplier;

    // Fetch transactions logic...

    const filteredTransactions = transactions.filter(
      (transaction) => transaction
    );

    let htmlContent = "<div style='margin: 50px;'>";
    htmlContent += "<h1>Invoice</h1>";
    if (customer) {
      htmlContent += `<span style="
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size:25px;
        padding: 10px;
        text-align: center;
        border-radius: 100%;
        color: wheat;
        background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
        margin-right: 20px;
      ">
        ${customer.name[0]}
      </span>
      ${customer.name}`;
    } else if (supplier) {
      htmlContent += `<span style="
        display: inline-block;
        width: 30px;
        height: 30px;
        font-size:25px;
        padding: 10px;
        text-align: center;
        border-radius: 100%;
        color: wheat;
        background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
        margin-right: 20px;
      ">
        ${supplier.name[0]}
      </span>
      ${supplier.name}`;
    }
    htmlContent +=
      "<ul style:'width:600px; text-align:center; overflow:hidden;'>";
    htmlContent += `<li style="display: grid; grid-auto-flow: column; font-size: 15px; font-style: bold; border-bottom: 5px solid green; align-items: center; margin: 0px;">
      <p style="margin: 0px; padding: 5px; font-size: 20px; display:inline-block; width:300px; text-align:center;">
         Description
      </p>
      <p style="margin: 0px; padding: 5px; font-size: 20px; display:inline-block; width:300px ;text-align:center;">
        Amount
      </p>
    </li>`;

    filteredTransactions.forEach((transaction) => {
      htmlContent += `
    <li style="display: grid; grid-auto-flow: column; font-size: 15px; gap: 60px; font-style: bold; border-bottom: 1px solid gray; align-items: center; margin: 0px;">
      <p style="margin: 0px; display:inline-block; width:400px">
        ${transaction.description}
        <br /> Date: ${formatDate(transaction.date)}
      </p>
      <p style="text-align: ${
        transaction.type === "gave" ? "left" : "right"
      }; color: ${
        transaction.type === "gave" ? "red" : "green"
      }; margin: 0px; padding: 5px; font-size: 20px; display:inline-block; width:300px">
        ${transaction.amount}
      </p>
    </li>`;
    });

    htmlContent += "</ul>";

    const totalAmount = filteredTransactions.reduce(
      (acc, curr) => acc + (curr.type === "gave" ? -curr.amount : +curr.amount),
      0
    );

    htmlContent += `<p style="text-align:right;"><strong>Total:</strong> ${
      totalAmount < 0 ? -totalAmount : totalAmount
    }</p>`;
    htmlContent += "</div>";

    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();

    res.setHeader(
      "Content-disposition",
      "attachment; filename=transactions.pdf"
    );
    res.set("Content-Type", "application/pdf");
    res.status(200).send(pdfBuffer);
  } catch (error) {
    console.error("Error downloading PDF file:", error);
    res.status(500).json({ error: "Error downloading PDF file" });
  }
});

module.exports = router;

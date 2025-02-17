import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { motion } from "framer-motion";

const Bill = () => {
  const [billDetail, setBillDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBills() {
      try {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) throw new Error("No token found");

        const token = JSON.parse(tokenString);
        const result = await axios.get(`/api/v1/gstBill/${params.id}`, {
          headers: {
            token: token.token,
          },
        });

        setBillDetail(...result.data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    }
    getBills();
  }, [params.id]);

  const handlePrint = () => {
    const printContent = document.getElementById("print-div");
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print</title>");
    printWindow.document.write(`
      <style>
        body { font-family: Arial, sans-serif; }
        .border { border: 1px solid #ddd; }
        .border-b-2 { border-bottom-width: 2px; }
        .border-blue-600 { border-color: #3182ce; }
        .bg-gray-100 { background-color: #f7fafc; }
        .bg-blue-600 { background-color: #3182ce; }
        .text-white { color: #fff; }
        .text-blue-600 { color: #3182ce; }
        .text-gray-600 { color: #718096; }
        .font-bold { font-weight: bold; }
        .font-semibold { font-weight: 600; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-lg { font-size: 1.125rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .pb-4 { padding-bottom: 1rem; }
        .pt-2 { padding-top: 0.5rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-6 { margin-top: 1.5rem; }
        .mt-8 { margin-top: 2rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-full { max-width: 100%; }
        .shadow-md { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .text-center { text-align: center; }
        .flex { display: flex; }
        .justify-between { justify-content: space-between; }
        .justify-end { justify-content: flex-end; }
        .cursor-pointer { cursor: pointer; }
        .w-full { width: 100%; }
        .w-80 { width: 20rem; }
        .border-collapse { border-collapse: collapse; }
        .border-gray-300 { border-color: #e2e8f0; }
        .odd\\:bg-white:nth-child(odd) { background-color: #fff; }
        .bg-white { background-color: #fff; }
        .text-red-600 { color: #e53e3e; }
      </style>
    `);
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  function handleNavigate(route) {
    navigate(route);
  }

  if (loading) {
    return <p className="text-center text-lg font-bold">Loading...</p>;
  }

  if (!billDetail) {
    return (
      <p className="text-center text-red-600">Error loading bill details</p>
    );
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bill</h1>
        <div className="flex gap-2">
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              handleNavigate(`/business/bills/create/${params.id}`)
            }
          >
            Update Bill
          </Button>
          <Button variant="contained" color="secondary" onClick={handlePrint}>
            Print Bill
          </Button>
        </div>
      </div>
      <Paper className="p-6 shadow-md" id="print-div">
        {/* Header Section */}
        <div className="flex justify-between border-b-2 border-blue-600 pb-4">
          <div>
            <h2 className="text-xl font-bold text-blue-600">
              Company / Seller Name
            </h2>
            <p className="text-gray-600">Address: Default Company Address</p>
            <p className="text-gray-600">Phone No: +91-0000000000</p>
            <p className="text-gray-600">Email: default@company.com</p>
            <p className="text-gray-600">GSTIN: DefaultGSTIN</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-blue-600">Tax Invoice</h1>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-4 bg-gray-100 p-4 border">
          <h3 className="text-lg font-semibold">Bill To</h3>
          <p className="font-semibold">{billDetail.name}</p>
          <p className="text-gray-600">Address: 123 Street, City, State</p>
          <p className="text-gray-600">Phone: +91-{billDetail.customerNo}</p>
        </div>

        {/* Items Table */}
        <div className="mt-6">
          <TableContainer component={Paper}>
            <Table>
              <TableHead className="bg-blue-600 text-white">
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Item</TableCell>
                  <TableCell>Qty</TableCell>
                  <TableCell>Discount (%)</TableCell>
                  <TableCell>GST (%)</TableCell>
                  <TableCell>Amount (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billDetail?.items?.map((item, index) => (
                  <TableRow key={index} className="bg-gray-100 odd:bg-white">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.discount}</TableCell>
                    <TableCell>{item.gstPer}</TableCell>
                    <TableCell>₹{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end mt-6">
          <div className="w-80 border p-4 bg-gray-100">
            <p className="flex justify-between">
              <span>Sub Total:</span>
              <span>
                ₹
                {billDetail.totalAmount +
                  billDetail.totalDiscount +
                  billDetail.totalGstAmount}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Discount:</span>
              <span>₹{billDetail.totalDiscount}</span>
            </p>
            <p className="flex justify-between">
              <span>SGST:</span>
              <span>₹{billDetail.totalGstAmount / 2}</span>
            </p>
            <p className="flex justify-between">
              <span>CGST:</span>
              <span>₹{billDetail.totalGstAmount / 2}</span>
            </p>
            <p className="flex justify-between">
              <span>IGST:</span>
              <span>₹0</span>
            </p>
            <div className="flex justify-between border-t mt-2 pt-2 font-semibold text-lg">
              <span>Total:</span>
              <span>₹{billDetail.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center border-t pt-4 text-gray-600">
          <p className="font-semibold">Terms & Conditions</p>
          <p>1. Goods once sold will not be taken back.</p>
          <p>2. Subject to City Jurisdiction.</p>
          <p>Company seal and sign</p>
        </div>
      </Paper>
    </div>
  );
};

export default Bill;

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
        @media print {
          body { 
            font-family: Arial, sans-serif;
            padding: 20px;
            margin: 0;
          }
          
          /* Paper styles */
          .MuiPaper-root {
            background-color: #fff;
            padding: 24px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          /* Table styles */
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
          }

          th {
            background-color: #3182ce !important;
            color: white !important;
            padding: 12px;
            text-align: left;
            font-weight: bold;
          }

          td {
            padding: 12px;
            border-bottom: 1px solid #e2e8f0;
          }

          tr:nth-child(odd) {
            background-color: #fff;
          }

          tr:nth-child(even) {
            background-color: #f7fafc;
          }

          /* Header section */
          .text-blue-600 {
            color: #3182ce;
          }

          .text-gray-600 {
            color: #718096;
          }

          .text-xl {
            font-size: 1.25rem;
          }

          .text-2xl {
            font-size: 1.5rem;
          }

          .font-bold {
            font-weight: bold;
          }

          .border-b-2 {
            border-bottom: 2px solid #3182ce;
          }

          /* Bill To section */
          .bg-gray-100 {
            background-color: #f7fafc;
            padding: 16px;
            border: 1px solid #e2e8f0;
            margin: 16px 0;
          }

          /* Summary section */
          .w-80 {
            width: 320px;
            margin-left: auto;
          }

          .justify-between {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
          }

          /* Footer section */
          .text-center {
            text-align: center;
          }

          .mt-8 {
            margin-top: 32px;
          }

          .pt-4 {
            padding-top: 16px;
          }

          .border-t {
            border-top: 1px solid #e2e8f0;
          }

          /* Hide print button in printout */
          button {
            display: none;
          }
        }
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

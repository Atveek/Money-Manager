import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const BusinessBills = () => {
  const [allBills, setAllBills] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    async function getBills() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const result = await axios.get("/api/v1/gstBill/", {
          headers: {
            token: token.token,
          },
        });
        const bills = result.data.bills;
        bills.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setAllBills(bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    }
    getBills();
  }, []);

  function handleNavigate(route) {
    navigator(route);
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Business Bills</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleNavigate("/business/bills/create")}
        >
          Create Bill
        </Button>
      </div>
      <TableContainer component={Paper} className="shadow-md">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>#</TableCell>
              <TableCell>Customer No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBills && allBills.length > 0 ? (
              allBills.map((bill, index) => (
                <TableRow
                  key={bill._id || index}
                  className="cursor-pointer"
                  onClick={() => handleNavigate(`/business/bills/${bill._id}`)}
                >
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      {index + 1}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      {bill.customerNo}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      {bill.name}
                    </motion.div>
                  </TableCell>
                  <TableCell>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      {bill.totalAmount}
                    </motion.div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="4" className="text-center">
                  No bills found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BusinessBills;

import React, { useEffect, useState } from "react";

import axios from "axios";
import "../../styles/CustomerList.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export default function TransactionList({
  selectedcustomer,
  loadtransectionfalse,
  setedit,
  setopen,
  setsum,
}) {
  const [transections, setTransections] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));

  function sum(transactions) {
    let total = 0;
    if (Array.isArray(transactions)) {
      transactions.forEach((transaction) => {
        if (transaction.type === "gave") {
          total -= transaction.amount;
        } else {
          total += transaction.amount;
        }
      });
    }
    console.log(total);
    setsum(total);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (adding 1 because January is 0) and pad with leading zero if necessary
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    return `${day}-${month}-${year}`; // Return formatted date string
  }
  useEffect(() => {
    async function getTransection() {
      try {
        const { data } = await axios.get(
          "/api/v1/transections/customer/transection",
          {
            headers: {
              token: token.token,
              customerid: selectedcustomer._id,
            },
          }
        );
        // message.success("transection  success");
        setTransections(data);
        console.log(data);
      } catch (error) {
        // message.error("something went wrong");
      }
    }
    getTransection();
  }, [selectedcustomer, token.token]);
  sum(transections);
  loadtransectionfalse();

  async function handleDeleteTransaction(transactionId) {
    try {
      await axios.post(
        `/api/v1/transections/delete-transection`,
        {
          transacationId: transactionId, // Keep the same variable name as in the backend
        },
        {
          headers: {
            customerid: selectedcustomer._id,
          },
        }
      );
      setTransections(transections.filter((t) => t._id !== transactionId));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  async function handleEditTransaction(transactionId) {
    try {
      const transactionToEdit = transections.find(
        (t) => t._id === transactionId
      );
      console.log(transactionToEdit);
      setedit(transactionToEdit); // Set the transaction to edit in state
      setopen(true); // Open the AddTransactionButton component
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  }

  return (
    <div>
      <ul className="overflowhandle">
        {transections &&
          Array.isArray(transections) &&
          transections.map((transaction) => (
            <li
              style={{
                display: "grid",
                gridAutoFlow: "column",
                fontSize: "15px",
                fontStyle: "bold",
                borderBottom: "1px solid gray",
                alignItems: "center",
                margin: "0px",
              }}
              key={transaction._id}
            >
              <p style={{ margin: "0px" }}>
                {transaction.description}
                <br /> Date: {formatDate(transaction.date)}
              </p>
              <p
                style={{
                  textAlign: transaction.type === "gave" ? "left" : "right",
                  color: transaction.type === "gave" ? "red" : "green",
                  margin: "0px",
                  padding: "5px",
                  fontSize: "20px",
                }}
              >
                {transaction.amount}
              </p>
              <p
                style={{
                  textAlign: "right",
                }}
              >
                <EditOutlined
                  onClick={() => {
                    handleEditTransaction(transaction._id);
                  }}
                />
                <DeleteOutlined
                  className="mx-2"
                  onClick={() => {
                    handleDeleteTransaction(transaction._id);
                  }}
                />
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

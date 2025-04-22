import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CustomerList.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,

} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  transactionList: {
    maxHeight: "calc(100vh - 300px)",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    animation: "fadeIn 0.5s ease-in-out",
    padding: "16px",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "3px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "3px",
      "&:hover": {
        background: "#555",
      },
    },
  },
  listItem: {
    marginBottom: "12px",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateX(4px)",
      backgroundColor: "#e3f2fd",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    },
  },
  description: {
    fontWeight: 500,
    color: "#2c3e50",
  },
  date: {
    color: "#7f8c8d",
    fontSize: "0.875rem",
  },
  amount: {
    fontWeight: 600,
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  give: {
    color: "#e53935",
  },
  got: {
    color: "#43a047",
  },
  actions: {
    display: "flex",
    gap: "8px",
  },
  editButton: {
    color: "#1976d2",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.08)",
    },
  },
  deleteButton: {
    color: "#d32f2f",
    "&:hover": {
      backgroundColor: "rgba(211, 47, 47, 0.08)",
    },
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
      transform: "translateY(20px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
});

export default function TransactionList({
  selectedcustomer,
  loadtransectionfalse,
  setedit,
  setopen,
  setsum,
}) {
  const [transections, setTransections] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const classes = useStyles();

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
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
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
        setTransections(data);
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
          transacationId: transactionId,
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
      setedit(transactionToEdit);
      setopen(true);
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  }

  return (
    <div>
      <List className={classes.transactionList}>
        {transections &&
          Array.isArray(transections) &&
          transections.map((transaction) => (
            <ListItem key={transaction._id} className={classes.listItem}>
              <ListItemText
                primary={transaction.description}
                secondary={`Date: ${formatDate(transaction.date)}`}
              />
              <ListItemText
                primary={transaction.amount}
                className={`${classes.amount} ${
                  transaction.type === "gave" ? classes.gave : classes.got
                }`}
                style={{
                  textAlign: transaction.type === "gave" ? "left" : "right",
                }}
              />
              <div className="flex items-center">
                <IconButton
                  onClick={() => handleEditTransaction(transaction._id)}
                >
                  <EditOutlined />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteTransaction(transaction._id)}
                >
                  <DeleteOutlined />
                </IconButton>
              </div>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

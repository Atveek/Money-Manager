import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CustomerList.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { List, ListItem, IconButton, Typography, Box } from "@mui/material";
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
  noTransactions: {
    textAlign: "center",
    padding: "32px",
    color: "#7f8c8d",
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
  selectedsupplier,
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
    setsum(total);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  }

  const handleEditTransaction = (transactionId) => {
    const transaction = transections.find((t) => t._id === transactionId);
    if (transaction) {
      setedit(transaction);
      setopen(true);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await axios.delete(
        `/api/v1/transections/delete-transection/${transactionId}`,
        {
          headers: {
            token: token.token,
            supplierid: selectedsupplier._id,
          },
        }
      );
      setTransections(transections.filter((t) => t._id !== transactionId));
      sum(transections.filter((t) => t._id !== transactionId));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  useEffect(() => {
    async function getTransection() {
      try {
        const { data } = await axios.get(
          "/api/v1/transections/supplier/transection",
          {
            headers: {
              token: token.token,
              supplierid: selectedsupplier._id,
            },
          }
        );
        setTransections(data);
        sum(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
    getTransection();
  }, [selectedsupplier, token.token]);

  loadtransectionfalse();

  return (
    <div className={classes.transactionList}>
      {transections && transections.length > 0 ? (
        <List>
          {transections.map((transaction) => (
            <ListItem key={transaction._id} className={classes.listItem}>
              <Box sx={{ flex: 1 }}>
                <Typography className={classes.description}>
                  {transaction.description}
                </Typography>
                <Typography className={classes.date}>
                  {formatDate(transaction.date)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography
                  className={`${classes.amount} ${
                    transaction.type === "gave" ? classes.give : classes.got
                  }`}
                >
                  {transaction.type === "gave" ? "- " : "+ "}₹
                  {transaction.amount}
                </Typography>
                <Box className={classes.actions}>
                  <IconButton
                    className={classes.editButton}
                    onClick={() => handleEditTransaction(transaction._id)}
                    size="small"
                  >
                    <EditOutlined />
                  </IconButton>
                  <IconButton
                    className={classes.deleteButton}
                    onClick={() => handleDeleteTransaction(transaction._id)}
                    size="small"
                  >
                    <DeleteOutlined />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" className={classes.noTransactions}>
          No transactions found
        </Typography>
      )}
    </div>
  );
}

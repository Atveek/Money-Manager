import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CustomerList.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { List, ListItem, ListItemText, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  transactionList: {
    maxHeight: "400px",
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.5s ease-in-out",
  },
  listItem: {
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    fontSize: "1.2rem",
  },
  give: {
    color: "#f44336",
  },
  got: {
    color: "#4caf50",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
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
        if (transaction.type === "give") {
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
          "/api/v1/transections/supplier/transection",
          {
            headers: {
              token: token.token,
              supplierid: selectedsupplier._id,
            },
          }
        );
        setTransections(data);
        console.log(data);
      } catch (error) {
        // message.error("something went wrong");
      }
    }
    getTransection();
  }, [selectedsupplier, token.token]);

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
            supplierid: selectedsupplier._id,
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
                  transaction.type === "give" ? classes.give : classes.got
                }`}
                style={{
                  textAlign: transaction.type === "give" ? "left" : "right",
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  customerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    animation: "fadeIn 0.6s ease-in-out",
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
  },
  customerSidebar: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    marginBottom: "24px",
    textAlign: "center",
    color: "#1a237e",
  },
  customerList: {
    width: "100%",
    overflowY: "auto",
    flex: 1,
    padding: "0 8px",
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
  addButton: {
    width: "100%",
    marginBottom: "16px",
    padding: "12px",
    backgroundColor: "#4caf50",
    color: "#fff",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#45a049",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.2)",
    },
  },
  avatar: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    width: "40px",
    height: "40px",
    marginRight: "16px",
    transition: "transform 0.2s ease",
  },
  listItem: {
    marginBottom: "8px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    backgroundColor: "#f8f9fa",
    "&:hover": {
      transform: "translateX(4px)",
      backgroundColor: "#e3f2fd",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    },
  },
  listItemText: {
    "& .MuiListItemText-primary": {
      fontWeight: 500,
      color: "#2c3e50",
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

export default function Customers({
  toggleaddcustomer,
  changecustomer,
  addcustomer,
}) {
  const [customers, setCustomers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get("/api/v1/users/customer", {
          headers: {
            token: token.token,
          },
        });
        setCustomers(response.data.customerList);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomers();
  }, [addcustomer]);

  function addNewCustomer() {
    toggleaddcustomer();
  }

  function clickevent(values) {
    changecustomer(values);
  }

  return (
    <Paper elevation={0} className={classes.customerContainer}>
      <div className={classes.customerSidebar}>
        <Typography variant="h4" component="h2" className={classes.header}>
          Customers
        </Typography>
        <List className={classes.customerList}>
          <ListItem>
            <Button
              variant="contained"
              onClick={addNewCustomer}
              className={classes.addButton}
              fullWidth
            >
              ➕ Add Customer 
            </Button>
          </ListItem>
          {customers.map((customer) => (
            <ListItem
              key={customer[0]._id}
              onClick={() => clickevent(customer[0])}
              button
              className={classes.listItem}
            >
              <Avatar className={classes.avatar}>{customer[0].name[0]}</Avatar>
              <ListItemText
                primary={customer[0].name}
                className={classes.listItemText}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </Paper>
  );
}

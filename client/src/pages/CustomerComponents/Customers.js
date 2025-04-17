import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CustomerList.css";
import { Button, List, ListItem, ListItemText, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  customerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.5s ease-in-out",
    width: "100%",
    maxWidth: "600px",
    margin: "20px auto",
  },
  customerSidebar: {
    width: "100%",
  },
  customerList: {
    width: "100%",
  },
  addButton: {
    width: "100%",
    marginBottom: "10px",
    backgroundColor: "#4caf50",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  avatar: {
    backgroundColor: "#3f51b5",
    color: "#fff",
  },
  listItem: {
    transition: "transform 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
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
    console.log(values);
    changecustomer(values);
  }

  return (
    <div className={classes.customerContainer}>
      <div className={classes.customerSidebar}>
        <h2>Customers</h2>
        <List className={classes.customerList}>
          <ListItem>
            <Button
              variant="contained"
              onClick={addNewCustomer}
              className={classes.addButton}
            >
              + Add New Customer
            </Button>
          </ListItem>
          {customers.map((customer) => (
            <li key={customer._id} onClick={() => clickevent(customer)}>
              <span className="customer-name">
                <span
                  style={{
                    display: "inline-block",
                    width: "33px",
                    height: "33px",
                    textAlign: "center",
                    borderRadius: "100%",
                    marginRight: "20px",
                    color: "wheat",
                    background:
                      "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                  }}
                >
                  {customer.name[0]}
                </span>
                {customer.name}
              </span>
              <span className="arrow">&rarr;</span>
            </li>
          ))}
        </List>
      </div>
    </div>
  );
}

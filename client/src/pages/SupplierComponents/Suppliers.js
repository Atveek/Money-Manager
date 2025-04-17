import React, { useEffect, useState } from "react";
import axios from "axios";
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

export default function Supplier({
  toggleaddsupplier,
  changesupplier,
  addsupplier,
}) {
  const [suppliers, setSuppliers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get("/api/v1/users/supplier", {
          headers: {
            token: token.token,
          },
        });
        setSuppliers(response.data.supplierList);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    }
    fetchSuppliers();
  }, [addsupplier]);

  function addNewSupplier() {
    toggleaddsupplier();
  }

  function clickevent(values) {
    console.log(values);
    changesupplier(values);
  }

  return (
    <div className={classes.customerContainer}>
      <div className={classes.customerSidebar}>
        <h2>Suppliers</h2>
        <List className={classes.customerList}>
          <ListItem>
            <Button
              variant="contained"
              onClick={addNewSupplier}
              className={classes.addButton}
            >
              + Add New Supplier
            </Button>
          </ListItem>
          {suppliers.map((supplier) => (
            <li key={supplier._id} onClick={() => clickevent(supplier)}>
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
                  {supplier.name[0]}
                </span>
                {supplier.name}
              </span>
              <span className="arrow">&rarr;</span>
            </li>
          ))}
        </List>
      </div>
    </div>
  );
}

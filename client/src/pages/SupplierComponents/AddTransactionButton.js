import React, { useState, useEffect } from "react";
import "../../styles/AddTransactionButton.css";
import axios from "axios";
import { TextField, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  addTransactionContainer: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.5s ease-in-out",
  },
  transactionForm: {
    display: "flex",
    flexDirection: "column",
  },
  transactionInput: {
    marginBottom: "10px",
  },
  submitButton: {
    marginTop: "10px",
  },
  closeButton: {
    marginTop: "10px",
  },
  "@keyframes fadeIn": {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

function AddTransactionButton({
  type,
  onClose,
  supplier,
  token,
  loadtransection,
  transactionToEdit,
}) {
  const classes = useStyles();
  const [transactionDetail, setTransactionDetail] = useState({
    amount: "",
    refrence: "",
    description: "",
    type: type,
    date: "",
  });

  useEffect(() => {
    if (transactionToEdit) {
      const formattedDate = new Date(transactionToEdit.date)
        .toISOString()
        .split("T")[0];
      setTransactionDetail({
        ...transactionToEdit,
        date: formattedDate,
      });
    }
  }, [transactionToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransactionDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(supplier._id, token);
      if (transactionToEdit) {
        await axios.post(
          `/api/v1/transections/edit-transection`,
          {
            transacationId: transactionToEdit._id,
            payload: transactionDetail,
          },
          {
            headers: {
              supplierid: supplier._id,
            },
          }
        );
      } else {
        await axios.post(
          "/api/v1/transections/supplier/transection",
          transactionDetail,
          {
            headers: {
              token: token,
              supplierid: supplier._id,
            },
          }
        );
      }
      console.log("Transaction submitted:", transactionDetail);
      loadtransection();
      onClose();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <Container className={classes.addTransactionContainer}>
      <div className={classes.transactionForm}>
        <TextField
          className={classes.transactionInput}
          type="text"
          name="amount"
          label="Amount"
          value={transactionDetail.amount}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          className={classes.transactionInput}
          type="text"
          name="refrence"
          label="Reference"
          value={transactionDetail.refrence}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          className={classes.transactionInput}
          type="text"
          name="description"
          label="Description"
          value={transactionDetail.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          className={classes.transactionInput}
          type="date"
          name="date"
          label="Date"
          value={transactionDetail.date}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.submitButton}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          className={classes.closeButton}
        >
          Close
        </Button>
      </div>
    </Container>
  );
}

export default AddTransactionButton;

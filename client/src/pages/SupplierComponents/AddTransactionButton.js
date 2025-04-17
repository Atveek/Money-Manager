import React, { useState, useEffect } from "react";
import "../../styles/AddTransactionButton.css";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  formContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    animation: "fadeIn 0.5s ease-in-out",
    padding: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    marginBottom: "24px",
    color: "#1a237e",
    fontWeight: 600,
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "&.Mui-focused": {
        backgroundColor: "#fff",
        "& fieldset": {
          borderColor: "#3f51b5",
          borderWidth: "2px",
        },
      },
    },
    "& .MuiInputLabel-root": {
      color: "#546e7a",
      "&.Mui-focused": {
        color: "#3f51b5",
      },
    },
  },
  buttons: {
    display: "flex",
    gap: "16px",
    marginTop: "16px",
  },
  submitButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#3f51b5",
    color: "#fff",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#303f9f",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
    },
  },
  closeButton: {
    flex: 1,
    padding: "12px",
    backgroundColor: "#f5f5f5",
    color: "#d32f2f",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#ffebee",
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(211, 47, 47, 0.1)",
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
    date: new Date().toISOString().split("T")[0],
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
      loadtransection();
      onClose();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  return (
    <Paper elevation={0} className={classes.formContainer}>
      <Typography variant="h5" className={classes.header}>
        {transactionToEdit ? "Edit Transaction" : "Add New Transaction"}
      </Typography>
      <Box className={classes.form}>
        <TextField
          className={classes.textField}
          type="number"
          name="amount"
          label="Amount"
          value={transactionDetail.amount}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: <Typography>₹</Typography>,
          }}
        />
        <TextField
          className={classes.textField}
          type="text"
          name="refrence"
          label="Reference"
          value={transactionDetail.refrence}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          type="text"
          name="description"
          label="Description"
          value={transactionDetail.description}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          multiline
          rows={2}
        />
        <TextField
          className={classes.textField}
          type="date"
          name="date"
          label="Date"
          value={transactionDetail.date}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box className={classes.buttons}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            className={classes.submitButton}
          >
            💾 Save Transaction
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            className={classes.closeButton}
          >
            ✖ Close
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default AddTransactionButton;

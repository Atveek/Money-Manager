import React, { useState } from "react";
import "../../styles/CustomerList.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import AddTransactionButton from "./AddTransactionButton";
import TransactionList from "./TransactionList";
import TransactionDownloader from "../TransactionDownloader";
import { Button, Avatar, Typography, Box, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  detailContainer: {
    padding: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    animation: "fadeIn 0.6s ease-in-out",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  avatar: {
    width: "56px",
    height: "56px",
    fontSize: "24px",
    backgroundColor: "#3f51b5",
    boxShadow: "0 4px 12px rgba(63, 81, 181, 0.2)",
  },
  name: {
    color: "#1a237e",
    fontWeight: 600,
  },
  balance: {
    padding: "8px 16px",
    borderRadius: "8px",
    fontWeight: 600,
    transition: "all 0.3s ease",
  },
  positiveBalance: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
  },
  negativeBalance: {
    backgroundColor: "#ffebee",
    color: "#c62828",
  },
  content: {
    flex: 1,
    overflowY: "auto",
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
  actionButtons: {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
    padding: "16px",
    borderTop: "1px solid #e0e0e0",
  },
  actionButton: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  },
  gaveButton: {
    backgroundColor: "#e3f2fd",
    color: "#1565c0",
    "&:hover": {
      backgroundColor: "#bbdefb",
      boxShadow: "0 4px 12px rgba(21, 101, 192, 0.2)",
    },
  },
  gotButton: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    "&:hover": {
      backgroundColor: "#c8e6c9",
      boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
    },
  },
  form: {
    padding: "24px",
    "& .ant-form-item": {
      marginBottom: "16px",
    },
    "& .ant-input": {
      borderRadius: "8px",
      padding: "12px",
    },
  },
  formButtons: {
    display: "flex",
    gap: "16px",
    marginTop: "24px",
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

export default function CustomerDetail({
  addcustomer,
  toggleaddcustomer,
  selectedcustomer,
  changecustomer,
}) {
  const classes = useStyles();
  const token = JSON.parse(localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const [totalsum, setTotalsum] = useState(0);
  const [load, setLoad] = useState(false);
  const [type, setType] = useState("");
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const submitHandler = async (values) => {
    try {
      const { data } = await axios.post(
        "/api/v1/customer/addcustomer",
        values,
        {
          headers: {
            token: token.token,
          },
        }
      );
      message.success("Customer added successfully");
      toggleaddcustomer();
      changecustomer(data);
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  function setedit(value) {
    setTransactionToEdit(value);
  }
  function setsum(values) {
    setTotalsum(values);
  }

  return (
    <>
      {!addcustomer && selectedcustomer && (
        <Paper elevation={0} className={classes.detailContainer}>
          <Box className={classes.header}>
            <Box className={classes.headerLeft}>
              <Avatar className={classes.avatar}>
                {selectedcustomer.name[0]}
              </Avatar>
              <Typography variant="h5" className={classes.name}>
                {selectedcustomer.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography
                variant="h6"
                className={`${classes.balance} ${
                  totalsum < 0
                    ? classes.negativeBalance
                    : classes.positiveBalance
                }`}
              >
                ₹ {Math.abs(totalsum)}
              </Typography>
              <TransactionDownloader customerid={selectedcustomer._id} />
            </Box>
          </Box>

          <Box className={classes.content}>
            {!isOpen && (
              <TransactionList
                setedit={setedit}
                setopen={setIsOpen}
                selectedcustomer={selectedcustomer}
                setsum={setsum}
                loadtransectionfalse={() => setLoad(false)}
              />
            )}
            {isOpen && (
              <AddTransactionButton
                transactionToEdit={transactionToEdit}
                setedit={setedit}
                customer={selectedcustomer}
                loadtransection={() => setLoad(true)}
                type={type}
                token={token.token}
                onClose={() => setIsOpen(false)}
              />
            )}
          </Box>

          <Box className={classes.actionButtons}>
            <Button
              variant="contained"
              className={`${classes.actionButton} ${classes.gaveButton}`}
              onClick={() => {
                setType("gave");
                setIsOpen(true);
              }}
            >
              ➤ <div className="text-xs">Give</div>
            </Button>
            <Button
              variant="contained"
              className={`${classes.actionButton} ${classes.gotButton}`}
              onClick={() => {
                setType("earn");
                setIsOpen(true);
              }}
            >
              ⬅ <div className="text-xs">Earn</div>
            </Button>
          </Box>
        </Paper>
      )}

      {addcustomer && (
        <Paper elevation={0} className={classes.detailContainer}>
          <Form
            layout="vertical"
            onFinish={submitHandler}
            className={classes.form}
          >
            <Typography variant="h4" gutterBottom>
              ➤ Add Customer
            </Typography>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter customer name" },
              ]}
            >
              <Input type="text" placeholder="Enter customer name" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input type="email" placeholder="Enter customer email" />
            </Form.Item>
            <Form.Item
              label="Phone no"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input type="number" placeholder="Enter phone number" />
            </Form.Item>
            <Box className={classes.formButtons}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                ➤ Add Customer
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleaddcustomer}
                fullWidth
              >
                ✖ Cancel
              </Button>
            </Box>
          </Form>
        </Paper>
      )}
    </>
  );
}

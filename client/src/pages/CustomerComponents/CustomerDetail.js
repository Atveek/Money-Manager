import React, { useState } from "react";
import "../../styles/CustomerList.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import AddTransactionButton from "./AddTransactionButton";
import TransactionList from "./TransactionList";
import TransactionDownloader from "../TransactionDownloader";
import { Button, Avatar, Typography, Container, Box } from "@mui/material";

export default function CustomerDetail({
  addcustomer,
  toggleaddcustomer,
  selectedcustomer,
  changecustomer,
}) {
  const token = JSON.parse(localStorage.getItem("token"));
  const [isOpen, setIsOpen] = useState(false);
  const [totalsum, setTotalsum] = useState(0);
  const [load, setLoad] = useState(false);
  const [type, setType] = useState("");
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const submitHandler = async (values) => {
    try {
      console.log(token);
      const { data } = await axios.post(
        "/api/v1/customer/addcustomer",
        values,
        {
          headers: {
            token: token.token,
          },
        }
      );
      message.success("add customer success");

      console.log(data);
      toggleaddcustomer();
      changecustomer(data);
    } catch (error) {
      message.error("something went wrong");
    }
  };

  console.log(load);
  function loadtransection() {
    setLoad(true);
  }
  function setopen(value) {
    setIsOpen(value);
  }
  function setedit(value) {
    setTransactionToEdit(value);
  }
  function loadtransectionfalse() {
    setLoad(false);
  }
  function setsum(values) {
    setTotalsum(values);
  }
  return (
    <>
      {!addcustomer && selectedcustomer && (
        <Container className="chat">
          <Box
            className="chat-header"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" component="h3">
              <Avatar
                className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-wheat"
                sx={{ width: 56, height: 56, marginRight: 2 }}
              >
                {selectedcustomer.name[0]}
              </Avatar>
              {selectedcustomer.name}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography
                variant="h6"
                component="p"
                className={`p-2 rounded-lg ${
                  totalsum < 0 ? "text-red-500" : "text-green-500"
                } bg-gradient-to-r from-gray-800 via-gray-900 to-black`}
              >
                {totalsum < 0 ? 0 - totalsum : totalsum}
              </Typography>
              <TransactionDownloader customerid={selectedcustomer._id} />
            </Box>
          </Box>
          <br />
          {!isOpen && (
            <TransactionList
              setedit={setedit}
              setopen={setopen}
              selectedcustomer={selectedcustomer}
              setsum={setsum}
              loadtransectionfalse={loadtransectionfalse}
            />
          )}
          {isOpen && (
            <AddTransactionButton
              transactionToEdit={transactionToEdit}
              setedit={setedit}
              customer={selectedcustomer}
              loadtransection={loadtransection}
              type={type}
              token={token.token}
              onClose={() => setIsOpen(false)}
            />
          )}
          {!isOpen && (
            <Box
              className="givegot"
              display="flex"
              justifyContent="space-between"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setType("gave");
                  setIsOpen(true);
                }}
              >
                You gave
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setType("earn");
                  setIsOpen(true);
                }}
              >
                You got
              </Button>
            </Box>
          )}
        </Container>
      )}

      {addcustomer && (
        <Container>
          <Form layout="vertical" onFinish={submitHandler}>
            <Typography variant="h4" component="h1">
              Add Customer Form
            </Typography>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please enter customer name" },
              ]}
            >
              <Input type="text" />
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
              <Input type="email" />
            </Form.Item>
            <Form.Item
              label="Phone no"
              name="phone"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Box display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                Add Customer
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={toggleaddcustomer}
              >
                Close
              </Button>
            </Box>
          </Form>
        </Container>
      )}
    </>
  );
}

import React, { useState } from "react";
import "../../styles/CustomerList.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import AddTransactionButton from "./AddTransactionButton";
import TransactionList from "./TransactionList";
import TransactionDownloader from "../TransactionDownloader";

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
        <div className="chat">
          <div
            className="chat-header"
            style={{
              display: "flex",
              direction: "ltr",
              justifyContent: "space-between",
            }}
          >
            <h3>
              <span
                style={{
                  display: "inline-block",
                  width: "50px",
                  height: "50px",
                  padding: "10px",
                  textAlign: "center",
                  borderRadius: "100%",
                  color: "wheat",
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                  marginRight: "20px",
                }}
              >
                {selectedcustomer.name[0]}
              </span>
              {selectedcustomer.name}
            </h3>{" "}
            <h3
              style={{
                display: "flex",
              }}
            >
              <p
                style={{
                  display: "inline-block",
                  padding: "10px",
                  textAlign: "center",
                  borderRadius: "10px",
                  margin: "0px",
                  minWidth: "50px",
                  color: totalsum < 0 ? "red" : "green",
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                }}
              >
                {totalsum < 0 ? 0 - totalsum : totalsum}
              </p>
              <TransactionDownloader customerid={selectedcustomer._id} />
            </h3>
          </div>
          <br></br>
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
            <div className="givegot">
              <button
                className="add-transaction-button"
                onClick={() => {
                  setType("gave");
                  setIsOpen(true);
                }}
              >
                You gave
              </button>
              <button
                className="add-transaction-button"
                onClick={() => {
                  setType("earn");
                  setIsOpen(true);
                }}
              >
                You got
              </button>
            </div>
          )}
        </div>
      )}

      {addcustomer && (
        <div>
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Add Customer Form</h1>
            <Form.Item
              label="name"
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
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" type="submit">
                Add Customer
              </button>
            </div>
          </Form>
          <br></br>
          <button className="btn btn-primary" onClick={toggleaddcustomer}>
            close
          </button>
        </div>
      )}
    </>
  );
}

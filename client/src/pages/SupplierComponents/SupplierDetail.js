import React, { useState } from "react";
import "../../styles/CustomerList.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import AddTransactionButton from "./AddTransactionButton";
import TransactionList from "./TransactionList";
import TransactionDownloader from "../TransactionDownloader";

export default function SupplierDetail({
  addsupplier,
  toggleaddsupplier,
  selectedsupplier,
  changesupplier,
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
        "/api/v1/supplier/addsupplier",
        values,
        {
          headers: {
            token: token.token,
          },
        }
      );
      message.success("add customer success");

      console.log(data);
      toggleaddsupplier();
      changesupplier(data);
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
      {!addsupplier && selectedsupplier && (
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
                {selectedsupplier.name[0]}
              </span>
              {selectedsupplier.name}
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
                  minWidth: "50px",
                  margin: "0px",
                  color: totalsum < 0 ? "red" : "green",
                  background:
                    "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
                }}
              >
                {totalsum < 0 ? 0 - totalsum : totalsum}
              </p>
              <TransactionDownloader supplierid={selectedsupplier._id} />
            </h3>
          </div>
          <br></br>
          {!isOpen && (
            <TransactionList
              setedit={setedit}
              setopen={setopen}
              selectedsupplier={selectedsupplier}
              setsum={setsum}
              loadtransectionfalse={loadtransectionfalse}
            />
          )}
          {isOpen && (
            <AddTransactionButton
              transactionToEdit={transactionToEdit}
              setedit={setedit}
              supplier={selectedsupplier}
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
                  setType("give");
                  setIsOpen(true);
                }}
              >
                You gave
              </button>
              <button
                className="add-transaction-button"
                onClick={() => {
                  setType("got");
                  setIsOpen(true);
                }}
              >
                You got
              </button>
            </div>
          )}
        </div>
      )}

      {addsupplier && (
        <div>
          <Form layout="vertical" onFinish={submitHandler}>
            <h1>Add Supplier Form</h1>
            <Form.Item
              label="name"
              name="name"
              rules={[
                { required: true, message: "Please enter supplier name" },
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
                Add Supplier
              </button>
            </div>
          </Form>
          <br></br>
          <button className="btn btn-primary" onClick={toggleaddsupplier}>
            close
          </button>
        </div>
      )}
    </>
  );
}

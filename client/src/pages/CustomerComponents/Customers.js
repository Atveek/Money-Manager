import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CustomerList.css"; // Import custom CSS file

export default function Customers({
  toggleaddcustomer,
  changecustomer,
  addcustomer,
}) {
  const [customers, setCustomers] = useState([]);

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
    <div className="customer-container">
      <div className="customer-sidebar">
        <h2>Customers</h2>
        <ul className="customer-list">
          <li>
            <button className="add-customer" onClick={addNewCustomer}>
              + Add New Customer
            </button>
          </li>
          {customers.map((customer) => (
            <li key={customer[0]._id} onClick={() => clickevent(customer[0])}>
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
                  {customer[0].name[0]}
                </span>
                {customer[0].name}
              </span>
              <span className="arrow">&rarr;</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

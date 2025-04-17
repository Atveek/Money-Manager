import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/CustomerList.css"; // Import custom CSS file

export default function Supplier({
  toggleaddsupplier,
  changesupplier,
  addsupplier,
}) {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get("/api/v1/users/supplier", {
          headers: {
            token: token.token,
          },
        });
        setSuppliers(response.data.supplierList);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomers();
  }, [addsupplier]);

  function addNewSupplier() {
    toggleaddsupplier();
  }
  function clickevent(values) {
    console.log(values);
    changesupplier(values);
  }

  return (
    <div className="customer-container">
      <div className="customer-sidebar">
        <h2>Supplier</h2>
        <ul className="customer-list">
          <li>
            <button className="add-customer" onClick={addNewSupplier}>
              + Add New Supplier
            </button>
          </li>
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
        </ul>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessBills = () => {
  const [allBills, setAllBills] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    async function getBills() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const result = await axios.get("/api/v1/gstBill/", {
          headers: {
            token: token.token,
          },
        });
        const bills = result.data.bills;
        bills.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setAllBills(bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    }
    getBills();
  }, []);

  function handleNavigate(route) {
    navigator(route);
  }
  return (
    <div style={{ padding: "20px" }}>
      <div className="flex w-full justify-content-between mb-2">
        <h1>Business Bills</h1>
        <button
          className="py-2 px-3 mt-3 bg-blue-800 text-xl text-white rounded-xl"
          onClick={() => handleNavigate("/business/bills/create")}
        >
          Create Bill
        </button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f3f3", borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>#</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Customer No</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {allBills && allBills.length > 0 ? (
            allBills.map((bill, index) => (
              <tr
                className="cursor-pointer"
                key={bill._id || index}
                style={{ borderBottom: "1px solid #ddd " }}
                onClick={() => handleNavigate(`/business/bills/${bill._id}`)}
              >
                <td style={{ padding: "8px" }}>{index + 1}</td>
                <td style={{ padding: "8px" }}>{bill.customerNo}</td>
                <td style={{ padding: "8px" }}>{bill.name}</td>
                <td style={{ padding: "8px" }}>{bill.totalAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ padding: "8px", textAlign: "center" }}>
                No bills found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BusinessBills;

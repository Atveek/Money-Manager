import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const TransactionAnalysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const customertoken = token.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customertoken) {
          console.error("Token not found");
          return;
        }
        setIsLoading(true);
        const response = await axios.get("/api/v1/transections/analyser", {
          headers: {
            token: customertoken,
          },
        });
        setMonthlyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [customertoken]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          color: "#2c3e50",
          marginBottom: "1.5rem",
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Transaction Analysis
      </h2>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          // padding: "1.5rem",
          minHeight: "400px",
        }}
      >
        {isLoading ? (
          <p style={{ color: "#64748b" }}>Loading data...</p>
        ) : Object.keys(monthlyData).length === 0 ? (
          <p style={{ color: "#64748b" }}>No transaction data available</p>
        ) : (
          <div style={{ width: "100%", maxWidth: "600px" }}>
            <ChartComponent data={monthlyData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionAnalysis;

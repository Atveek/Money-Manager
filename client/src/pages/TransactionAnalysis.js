import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const TransactionAnalysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const customertoken = token.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customertoken) {
          console.error("Token not found");
          return;
        }
        const response = await axios.get("/api/v1/transections/analyser", {
          headers: {
            token: customertoken,
          },
        });
        setMonthlyData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [customertoken]);

  return (
    <div style={{ display: "inline-block" }}>
      <h2>Last 6 Months Customer Transaction Analysis</h2>
      <div style={{ width: "45vw" }}>
        {" "}
        {/* Set the width to 50% of the viewport width */}
        <ChartComponent data={monthlyData} />
      </div>
    </div>
  );
};

export default TransactionAnalysis;

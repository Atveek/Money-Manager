import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const ProfitAnalysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [yearlyData, setYearlyData] = useState({});
  const [showMonthly, setShowMonthly] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const customertoken = token.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!customertoken) {
          console.error("Token not found");
          return;
        }
        const response = await axios.get("/api/v1/transections/profit", {
          headers: {
            token: customertoken,
          },
        });
        setMonthlyData(response.data);
        const yearlyProfits = Object.values(response.data).reduce(
          (acc, curr) => acc + curr.ptofit,
          0
        );
        const yearlyCustomerAmount = Object.values(response.data).reduce(
          (acc, curr) => acc + curr.customeramout,
          0
        );
        const yearlySupplierAmount = Object.values(response.data).reduce(
          (acc, curr) => acc + curr.supplieramount,
          0
        );
        setYearlyData({
          profit: yearlyProfits,
          customerAmount: yearlyCustomerAmount,
          supplierAmount: yearlySupplierAmount,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [customertoken]);

  const handleToggleData = () => {
    setShowMonthly(!showMonthly);
  };

  const monthlyChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Profit Analysis",
        backgroundColor: [
          "#1a237e", // Dark blue
          "#4a148c", // Dark purple
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        data: Object.values(monthlyData).map((item) => item.ptofit),
      },
    ],
  };

  const yearlyChartData = {
    labels: ["Customer Amount", "Supplier Amount"],
    datasets: [
      {
        label: "Yearly Profit Analysis",
        backgroundColor: ["green", "red"],
        data: [yearlyData.customerAmount, yearlyData.supplierAmount],
      },
    ],
  };

  return (
    <div style={{ display: "inline-block", width: "25vw" }}>
      <div>
        <h2>
          {showMonthly ? "Monthly Profit Analysis" : "Yearly Profit Analysis"}
        </h2>
        {showMonthly ? (
          <Pie data={monthlyChartData} style={{ width: "30vw" }} />
        ) : (
          <Pie data={yearlyChartData} style={{}} />
        )}
        <button
          className="button"
          style={{
            marginTop: "10px",
          }}
          onClick={handleToggleData}
        >
          {showMonthly ? "Show Yearly Data" : "Show Monthly Data"}
        </button>
      </div>
      {!showMonthly && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "650px",
            gap: 1,
            fontSize: "20px",
          }}
        >
          <p>
            Yearly Customer Amount:{" "}
            <b style={{ color: "green" }}>{yearlyData.customerAmount}</b>
          </p>
          <p>
            Yearly Supplier Amount:{" "}
            <b style={{ color: "red" }}>{yearlyData.supplierAmount}</b>
          </p>
          <p>
            Yearly Profit Amount:{" "}
            <b style={{ color: "blue" }}>
              {yearlyData.customerAmount - yearlyData.supplierAmount}
            </b>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfitAnalysis;

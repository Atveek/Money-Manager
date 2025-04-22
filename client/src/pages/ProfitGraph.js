import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfitAnalysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [yearlyData, setYearlyData] = useState({});
  const [showMonthly, setShowMonthly] = useState(false);
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
      } finally {
        setIsLoading(false);
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
          "#4a90e2", "#50c878", "#f39c12",
          "#9b59b6", "#3498db", "#e74c3c",
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
        backgroundColor: ["#50c878", "#e74c3c"],
        data: [yearlyData.customerAmount, yearlyData.supplierAmount],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
      legend: {
        labels: {
          generateLabels: function (chart) {
            const data = chart.data;
            return data.labels.map((label, i) => {
              const value = data.datasets[0].data[i];
              return {
                text: `${label}: ₹${value.toLocaleString()}`,
                fillStyle: data.datasets[0].backgroundColor[i],
                strokeStyle: data.datasets[0].borderColor || 'transparent',
                lineWidth: 1,
                hidden: isNaN(value),
                index: i,
              };
            });
          },
        },
      },
    },
  };

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
        {showMonthly ? "Monthly Profit Analysis" : "Yearly Profit Analysis"}
      </h2>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8fafc",
          borderRadius: "12px",
          padding: "1.5rem",
        }}
      >
        {isLoading ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#64748b",
            }}
          >
            Loading data...
          </div>
        ) : (
          <>
            <div
              style={{
                maxWidth: "400px",
                margin: "0 auto 1.5rem auto",
              }}
            >
              {showMonthly ? (
                <Pie data={monthlyChartData} options={chartOptions} />
              ) : (
                <Pie data={yearlyChartData} options={chartOptions} />
              )}
            </div>

            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <button
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#4a90e2",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                  padding: "1rem",
                  backgroundColor: "white",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Customer Amount
                  </p>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#50c878",
                      margin: 0,
                    }}
                  >
                    ₹{yearlyData.customerAmount?.toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Supplier Amount
                  </p>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#e74c3c",
                      margin: 0,
                    }}
                  >
                    ₹{yearlyData.supplierAmount?.toLocaleString()}
                  </p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#64748b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Net Profit
                  </p>
                  <p
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "600",
                      color: "#4a90e2",
                      margin: 0,
                    }}
                  >
                    ₹
                    {(
                      yearlyData.customerAmount - yearlyData.supplierAmount
                    )?.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfitAnalysis;

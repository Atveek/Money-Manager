import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

const ProfitAnalysis = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const [yearlyData, setYearlyData] = useState({});
  const [showMonthly, setShowMonthly] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const customertoken = token?.token;

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

  const handleToggleData = () => setShowMonthly(!showMonthly);

  const monthlyChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Profit Analysis",
        backgroundColor: [
          "#1a237e",
          "#4a148c",
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
        backgroundColor: ["#10b981", "#ef4444"],
        data: [yearlyData.customerAmount, yearlyData.supplierAmount],
      },
    ],
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 overflow-hidden"
      style={{ width: "40vw", height: "75vh", minWidth: "320px" }}
    >
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          {showMonthly ? "Monthly Profit Analysis" : "Yearly Profit Analysis"}
        </h2>

        <div className="flex-grow">
          <Pie
            key={showMonthly ? "monthly" : "yearly"}
            data={showMonthly ? monthlyChartData : yearlyChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handleToggleData}
          >
            {showMonthly ? "Show Yearly Data" : "Show Monthly Data"}
          </button>
        </div>

        {!showMonthly && (
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Customer Amount</span>
                <span className="text-xl font-bold text-emerald-600">
                  ${yearlyData.customerAmount?.toLocaleString() || 0}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Supplier Amount</span>
                <span className="text-xl font-bold text-red-600">
                  ${yearlyData.supplierAmount?.toLocaleString() || 0}
                </span>
              </div>

              <div className="md:col-span-2 pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-500">Profit</span>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    $
                    {(
                      yearlyData.customerAmount - yearlyData.supplierAmount
                    )?.toLocaleString() || 0}
                  </span>
                  <span className="ml-2 px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-800">
                    {yearlyData.customerAmount && yearlyData.supplierAmount
                      ? (
                          ((yearlyData.customerAmount -
                            yearlyData.supplierAmount) /
                            yearlyData.customerAmount) *
                          100
                        ).toFixed(1) + "%"
                      : "0%"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitAnalysis;

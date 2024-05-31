import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const months = Object.keys(data);
      const amounts = Object.values(data);

      // Function to generate random dark color

      const maxAmount = Math.max(...amounts);
      const scaledMaxAmount = Math.ceil(maxAmount / 5);

      const myChart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: months,
          datasets: [
            {
              label: "Total Amount",
              backgroundColor: "#20c997",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
              data: amounts,
            },
          ],
        },
        options: {
          scales: {
            y: {
              type: "linear",
              ticks: {
                beginAtZero: true,
                stepSize: scaledMaxAmount,
              },
            },
          },
        },
      });

      return () => {
        myChart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} style={{ width: "50%" }} />;
};

export default ChartComponent;

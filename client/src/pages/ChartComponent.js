import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current && Object.keys(data).length) {
      if (chartInstance.current) chartInstance.current.destroy();

      const sortedMonths = Object.keys(data)
        .map(dateStr => {
          const [month, year] = dateStr.split('-').map(Number);
          return { key: dateStr, date: new Date(year, month - 1) };
        })
        .sort((a, b) => a.date - b.date)
        .map(obj => obj.key);

      const sortedAmounts = sortedMonths.map(month => data[month]);

      const changes = sortedAmounts.map((amount, index) =>
        index === 0 ? 0 : amount - sortedAmounts[index - 1]
      );

      const maxAmount = Math.max(...sortedAmounts);
      const scaledMaxAmount = Math.ceil(maxAmount / 5);

      const ctx = chartRef.current.getContext("2d");

      const positiveGradient = ctx.createLinearGradient(0, 0, 0, 400);
      positiveGradient.addColorStop(0, 'rgba(34, 197, 94, 0.9)');
      positiveGradient.addColorStop(1, 'rgba(34, 197, 94, 0.3)');

      const negativeGradient = ctx.createLinearGradient(0, 0, 0, 400);
      negativeGradient.addColorStop(0, 'rgba(239, 68, 68, 0.9)');
      negativeGradient.addColorStop(1, 'rgba(239, 68, 68, 0.3)');

      const drawArrow = (ctx, x, y, value) => {
        ctx.save();
        const arrowSize = 8;
        const arrowY = value > 0 ? y - 15 : y + 15;
        ctx.beginPath();
        ctx.moveTo(x, arrowY);
        if (value > 0) {
          ctx.lineTo(x - arrowSize, arrowY + arrowSize);
          ctx.lineTo(x + arrowSize, arrowY + arrowSize);
          ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
        } else if (value < 0) {
          ctx.lineTo(x - arrowSize, arrowY - arrowSize);
          ctx.lineTo(x + arrowSize, arrowY - arrowSize);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.9)';
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: sortedMonths,
          datasets: [
            {
              label: "Transaction Amount",
              data: sortedAmounts,
              backgroundColor: sortedAmounts.map((_, i) =>
                i === 0
                  ? 'rgba(99, 102, 241, 0.7)'
                  : sortedAmounts[i] >= sortedAmounts[i - 1]
                  ? positiveGradient
                  : negativeGradient
              ),
              borderColor: sortedAmounts.map((_, i) =>
                i === 0
                  ? 'rgb(99, 102, 241)'
                  : sortedAmounts[i] >= sortedAmounts[i - 1]
                  ? 'rgb(34, 197, 94)'
                  : 'rgb(239, 68, 68)'
              ),
              borderWidth: 1,
              borderRadius: 6,
            },
            {
              label: "Monthly Change",
              data: changes,
              type: 'line',
              fill: false,
              borderColor: 'rgba(59, 130, 246, 0.8)',
              borderDash: [5, 5],
              pointBackgroundColor: changes.map(change =>
                change > 0
                  ? 'rgba(34, 197, 94, 1)'
                  : change < 0
                  ? 'rgba(239, 68, 68, 1)'
                  : 'rgba(59, 130, 246, 1)'
              ),
              pointBorderColor: 'white',
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.1,
              order: 0,
            }
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: 'index' },
          plugins: {
            title: {
              display: true,
              text: 'Transaction Flow Analysis',
              font: { family: 'Inter, sans-serif', size: 16, weight: 'bold' },
              padding: { top: 10, bottom: 30 },
            },
            legend: {
              position: 'top',
              align: 'end',
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: 'circle',
                font: { family: 'Inter, sans-serif', size: 12 },
              },
            },
            tooltip: {
              backgroundColor: 'rgba(17, 24, 39, 0.8)',
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: function (context) {
                  const datasetLabel = context.dataset.label || '';
                  const value = context.parsed.y;
                  const sign = value > 0 ? '+' : '';
                  return `${datasetLabel}: ${sign}${value.toLocaleString()}`;
                }
              }
            }
          },
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                stepSize: scaledMaxAmount,
                callback: value =>  value.toLocaleString(),
                font: { family: 'Inter, sans-serif', size: 11 },
              },
              title: {
                display: true,
                text: 'Amount ()',
                font: { family: 'Inter, sans-serif', size: 12, weight: 'bold' },
              },
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
            },
            x: {
              ticks: { font: { family: 'Inter, sans-serif', size: 11 } },
              title: {
                display: true,
                text: 'Month',
                font: { family: 'Inter, sans-serif', size: 12, weight: 'bold' },
              },
              grid: { display: false },
            }
          },
          animation: {
            onComplete: function () {
              const { ctx, scales, data } = this;
              data.datasets[0].data.forEach((value, index) => {
                if (index === 0) return;
                const x = scales.x.getPixelForValue(index);
                const y = scales.y.getPixelForValue(value);
                drawArrow(ctx, x, y, changes[index]);
              });
            }
          }
        }
      });

      return () => {
        if (chartInstance.current) chartInstance.current.destroy();
      };
    }
  }, [data]);

  return (
    <div className="w-full h-full p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-gray-600">Increase</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs text-gray-600">Decrease</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
            <span className="text-xs text-gray-600">Initial</span>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      <div className="relative w-full h-full">
        <canvas ref={chartRef} className="w-full h-full"></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;

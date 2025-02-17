import React from "react";
import { Progress } from "antd";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = ({ allTransection }) => {
  const totalTransaction = allTransection.length;
  const incomeTransactions = allTransection.filter((t) => t.type === "income");
  const expenseTransactions = allTransection.filter(
    (t) => t.type === "expense"
  );

  const totalIncomePercent =
    (incomeTransactions.length / totalTransaction) * 100;
  const totalExpensePercent =
    (expenseTransactions.length / totalTransaction) * 100;

  const totalTurnover = allTransection.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnover = incomeTransactions.reduce(
    (acc, t) => acc + t.amount,
    0
  );
  const totalExpenseTurnover = expenseTransactions.reduce(
    (acc, t) => acc + t.amount,
    0
  );
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  const incomeCategories = [
    ...new Set(incomeTransactions.map((t) => t.category)),
  ];
  const expenseCategories = [
    ...new Set(expenseTransactions.map((t) => t.category)),
  ];

  const pieChartData = [
    { name: "Income", value: totalIncomeTurnover },
    { name: "Expense", value: totalExpenseTurnover },
  ];
  const COLORS = ["#6BAA75", "#D67D79"];

  const categoryData = [...incomeCategories, ...expenseCategories].map(
    (category) => {
      const income = incomeTransactions
        .filter((t) => t.category === category)
        .reduce((acc, t) => acc + t.amount, 0);
      const expense = expenseTransactions
        .filter((t) => t.category === category)
        .reduce((acc, t) => acc + t.amount, 0);
      return { category, Income: income, Expense: expense };
    }
  );

  return (
    <motion.div className="container p-4 bg-light rounded shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div
        className="card p-4 shadow-md bg-white rounded flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
      >
        <h5 className="text-primary font-semibold">Total Transactions</h5>
        <p className="text-lg font-medium">{totalTransaction}</p>
        <div className="flex items-center gap-4">
          <Progress
            type="circle"
            strokeColor="#6BAA75"
            percent={totalIncomePercent.toFixed(0)}
          />
          <Progress
            type="circle"
            strokeColor="#D67D79"
            percent={totalExpensePercent.toFixed(0)}
          />
        </div>
      </motion.div>

      <motion.div
        className="card p-4 shadow-md bg-white rounded flex flex-col items-center"
        whileHover={{ scale: 1.05 }}
      >
        <h5 className="text-primary font-semibold">Total Turnover</h5>
        <p className="text-lg font-medium">₹{totalTurnover.toFixed(2)}</p>
        <div className="flex items-center gap-4">
          <Progress
            type="circle"
            strokeColor="#6BAA75"
            percent={totalIncomeTurnoverPercent.toFixed(0)}
          />
          <Progress
            type="circle"
            strokeColor="#D67D79"
            percent={totalExpenseTurnoverPercent.toFixed(0)}
          />
        </div>
      </motion.div>

      <motion.div
        className="card p-4 shadow-md bg-white rounded"
        whileHover={{ scale: 1.05 }}
      >
        <h6 className="text-center text-lg font-semibold">Income vs Expense</h6>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className="card p-4 shadow-md bg-white rounded"
        whileHover={{ scale: 1.05 }}
      >
        <h6 className="text-center text-lg font-semibold">
          Category-wise Analysis
        </h6>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={categoryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="category" tick={{ fill: "#555" }} />
            <YAxis tick={{ fill: "#555" }} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="Income"
              fill="#6BAA75"
              barSize={30}
              radius={[5, 5, 0, 0]}
            />
            <Bar
              dataKey="Expense"
              fill="#D67D79"
              barSize={30}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;

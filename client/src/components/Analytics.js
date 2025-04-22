import React from "react";
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
  AreaChart,
  Area,
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

  const pieChartData = [
    { name: "Income", value: totalIncomeTurnover },
    { name: "Expense", value: totalExpenseTurnover },
  ];

  // Modern color palette
  const COLORS = ["#4F46E5", "#EF4444"];
  const HOVER_COLORS = ["#4338CA", "#DC2626"];

  // Group transactions by category
  const categoryData = [...new Set(allTransection.map((t) => t.category))].map(
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

  // Group transactions by date for trend analysis
  const trendData = allTransection.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { date, Income: 0, Expense: 0 };
    }
    if (transaction.type === "income") {
      acc[date].Income += transaction.amount;
    } else {
      acc[date].Expense += transaction.amount;
    }
    return acc;
  }, {});

  const sortedTrendData = Object.values(trendData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Summary Cards */}
      <motion.div
        className="col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Transactions
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {totalTransaction}
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-green-600">
              Income: {totalIncomePercent.toFixed(0)}%
            </span>
            <span className="text-red-600">
              Expense: {totalExpensePercent.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Total Turnover
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            ₹{totalTurnover.toLocaleString()}
          </p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-green-600">
              Income: ₹{totalIncomeTurnover.toLocaleString()}
            </span>
            <span className="text-red-600">
              Expense: ₹{totalExpenseTurnover.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Net Balance
          </h3>
          <p
            className={`text-3xl font-bold ${
              totalIncomeTurnover - totalExpenseTurnover >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{(totalIncomeTurnover - totalExpenseTurnover).toLocaleString()}
          </p>
          <p className="mt-4 text-sm text-gray-600">Current Balance Status</p>
        </div>
      </motion.div>

      {/* Income vs Expense Pie Chart */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Income vs Expense
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  onMouseEnter={(e) => {
                    e.target.style.fill =
                      HOVER_COLORS[index % HOVER_COLORS.length];
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.fill = COLORS[index % COLORS.length];
                  }}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Category Analysis */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Category Analysis
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={categoryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="category"
              tick={{ fill: "#4B5563", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#4B5563", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Bar
              dataKey="Income"
              fill={COLORS[0]}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
            <Bar
              dataKey="Expense"
              fill={COLORS[1]}
              radius={[4, 4, 0, 0]}
              maxBarSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Trend Analysis */}
      <motion.div
        className="col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Financial Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={sortedTrendData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fill: "#4B5563", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#4B5563", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-gray-600">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="Income"
              stroke={COLORS[0]}
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
            <Area
              type="monotone"
              dataKey="Expense"
              stroke={COLORS[1]}
              fillOpacity={1}
              fill="url(#colorExpense)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;

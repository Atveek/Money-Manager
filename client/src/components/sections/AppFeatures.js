import React from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  Wallet,
  LineChart,
  Calculator,
  PiggyBank,
  Bell,
  Target,
  TrendingUp,
} from "lucide-react";

const AppFeatures = () => {
  const features = [
    {
      icon: <Wallet className="w-12 h-12 text-blue-600" />,
      title: "Smart Expense Tracking",
      text: "Automatically categorize your expenses and get instant insights into your spending patterns",
    },
    {
      icon: <Calculator className="w-12 h-12 text-purple-600" />,
      title: "Budget Planning",
      text: "Set custom budgets for different categories and track your progress with visual indicators",
    },
    {
      icon: <LineChart className="w-12 h-12 text-green-600" />,
      title: "Financial Analytics",
      text: "View detailed charts and reports to understand your financial habits better",
    },
    {
      icon: <Receipt className="w-12 h-12 text-orange-600" />,
      title: "Receipt Management",
      text: "Easily attach and organize receipts for better expense tracking and documentation",
    },
    {
      icon: <PiggyBank className="w-12 h-12 text-indigo-600" />,
      title: "Savings Goals",
      text: "Set and track your savings goals with progress monitoring and milestone alerts",
    },
    {
      icon: <Bell className="w-12 h-12 text-red-600" />,
      title: "Smart Alerts",
      text: "Get notifications for bill payments, budget limits, and unusual spending patterns",
    },
    {
      icon: <Target className="w-12 h-12 text-teal-600" />,
      title: "Custom Categories",
      text: "Create and manage personalized expense categories that match your lifestyle",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-yellow-600" />,
      title: "Trend Analysis",
      text: "Track spending trends over time and identify areas for financial improvement",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-gradient-to-b from-blue-50 to-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            className="text-blue-600 font-semibold text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            POWERFUL FEATURES
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Everything You Need in One App
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="mb-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default AppFeatures;

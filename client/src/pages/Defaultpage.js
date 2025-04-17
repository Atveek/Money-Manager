import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PieChart,
  Shield,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Footer } from "antd/lib/layout/layout";

const DefaultPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-blue-500 opacity-5 pattern-dots"></div>
        <div className="max-w-6xl mx-auto text-center z-10">
          <motion.h1
            className="text-5xl font-bold text-gray-800 mb-6"
            variants={itemVariants}
          >
            Welcome to Money Manager
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8"
            variants={itemVariants}
          >
            Your Personal Finance Companion for Smart Money Management
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center"
            variants={itemVariants}
          >
            <Link
              to="/login"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Login <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors border border-blue-600"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Why Choose Money Manager?
            </h2>
            <p className="text-gray-600">
              Experience the future of personal finance management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PieChart className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Efficient Management
              </h3>
              <p className="text-gray-600">
                Streamline your financial journey with comprehensive tools and
                insights.
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Secure Transactions
              </h3>
              <p className="text-gray-600">
                Advanced encryption ensuring your financial data stays
                protected.
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Insights</h3>
              <p className="text-gray-600">
                Get instant analytics and insights about your spending patterns.
              </p>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BarChart3 className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
              <p className="text-gray-600">
                Comprehensive charts and graphs for better financial
                understanding.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-blue-600 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div whileHover={{ scale: 1.1 }} className="p-6">
              <h3 className="text-4xl font-bold mb-2">10K+</h3>
              <p className="text-blue-100">Active Users</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="p-6">
              <h3 className="text-4xl font-bold mb-2">$1M+</h3>
              <p className="text-blue-100">Transactions Tracked</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} className="p-6">
              <h3 className="text-4xl font-bold mb-2">99.9%</h3>
              <p className="text-blue-100">Uptime</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
};

export default DefaultPage;

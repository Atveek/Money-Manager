import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PieChart,
  Shield,
  TrendingUp,
  BarChart3,
  User,
  Clock,
  Smartphone,
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
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        className="relative h-screen flex items-center justify-center px-4 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/inspiration-geometry.png')]"></div>
        <div className="max-w-6xl mx-auto text-center z-10 space-y-8">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
            variants={itemVariants}
          >
            Take Control of Your Finances
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Transform your financial life with intuitive budgeting, smart
            expense tracking, and powerful insights. Start saving smarter today.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            variants={itemVariants}
          >
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 group hover:scale-105"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your Financial Superpowers
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover features designed to give you complete control over your
              money
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <PieChart className="w-12 h-12 text-blue-600" />,
                title: "Smart Budgeting",
                text: "Create custom budgets that automatically adjust to your spending patterns",
              },
              {
                icon: <Shield className="w-12 h-12 text-purple-600" />,
                title: "Bank-Level Security",
                text: "256-bit encryption and biometric authentication keep your data safe",
              },
              {
                icon: <TrendingUp className="w-12 h-12 text-green-600" />,
                title: "Wealth Building",
                text: "AI-powered insights to help grow your net worth",
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-orange-600" />,
                title: "Deep Analytics",
                text: "Interactive dashboards with real-time financial health metrics",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-100 hover:shadow-xl transition-all group relative overflow-hidden"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.text}</p>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-0 group-hover:opacity-20 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-blue-700 to-purple-700"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { value: "10K+", label: "Happy Users", icon: <User /> },
              { value: "$1B+", label: "Managed", icon: <PieChart /> },
              { value: "24/7", label: "Support", icon: <Clock /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-5xl font-bold mb-4 text-white flex items-center justify-center gap-3">
                  {stat.icon}
                  {stat.value}
                </div>
                <p className="text-blue-100 text-lg font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Money Manager</h3>
              <p className="text-gray-400">
                Empowering financial freedom since 2023
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            © 2023 Money Manager. All rights reserved.
          </div>
        </div>
      </Footer>
    </div>
  );
};

export default DefaultPage;

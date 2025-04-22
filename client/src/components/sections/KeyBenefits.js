import React from "react";
import { motion } from "framer-motion";
import {
  Wallet,
  LineChart,
  Users,
  Building2,
  FileText,
  Download,
  PieChart,
  Calendar,
} from "lucide-react";

const KeyBenefits = () => {
  const personalFeatures = [
    {
      icon: <Wallet className="w-12 h-12 text-blue-600" />,
      title: "Income & Expense Tracking",
      text: "Easily track your personal income and expenses with automatic categorization",
    },
    {
      icon: <LineChart className="w-12 h-12 text-purple-600" />,
      title: "Advanced Analytics",
      text: "View detailed charts and insights of your spending patterns and financial health",
    },
    {
      icon: <Calendar className="w-12 h-12 text-green-600" />,
      title: "Time-Based Reports",
      text: "Access weekly and monthly breakdowns of your finances by category",
    },
    {
      icon: <PieChart className="w-12 h-12 text-orange-600" />,
      title: "Category Dashboard",
      text: "Interactive dashboard showing expense distribution across categories",
    },
  ];

  const businessFeatures = [
    {
      icon: <Users className="w-12 h-12 text-indigo-600" />,
      title: "Customer & Supplier Management",
      text: "Maintain detailed records of all your business contacts and transactions",
    },
    {
      icon: <FileText className="w-12 h-12 text-red-600" />,
      title: "GST Bill Generation",
      text: "Generate professional GST-compliant invoices and bills instantly",
    },
    {
      icon: <Building2 className="w-12 h-12 text-teal-600" />,
      title: "Business Analytics",
      text: "Comprehensive business insights with revenue and expense tracking",
    },
    {
      icon: <Download className="w-12 h-12 text-yellow-600" />,
      title: "Data Export",
      text: "Export your records in CSV format for easy analysis and record-keeping",
    },
  ];

  return (
    <motion.section
      className="py-20 bg-white"
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
            TAILORED FOR EVERYONE
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-gray-800 mt-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Complete Financial Management Solution
          </motion.h2>
        </div>

        {/* Personal Features Section */}
        <div className="mb-16">
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Personal User Features
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-8">
            {personalFeatures.map((feature, index) => (
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

        {/* Business Features Section */}
        <div>
          <motion.h3
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Business User Features
          </motion.h3>
          <div className="grid md:grid-cols-4 gap-8">
            {businessFeatures.map((feature, index) => (
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
      </div>
    </motion.section>
  );
};

export default KeyBenefits;

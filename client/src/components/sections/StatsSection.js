import React from "react";
import { motion } from "framer-motion";
import { Users, CreditCard, Star, Globe } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { value: "1M+", label: "Active Users", icon: <Users /> },
    { value: "$5B+", label: "Transactions Tracked", icon: <CreditCard /> },
    { value: "4.9", label: "App Store Rating", icon: <Star /> },
    { value: "150+", label: "Countries", icon: <Globe /> },
  ];

  return (
    <motion.section
      className="py-20 bg-gradient-to-r from-blue-700 to-purple-700"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="text-5xl font-bold mb-4 text-white flex items-center justify-center gap-3"
                whileHover={{ scale: 1.1 }}
              >
                {stat.icon}
                {stat.value}
              </motion.div>
              <p className="text-blue-100 text-lg font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
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
    <motion.section
      className="relative h-screen flex items-center justify-center px-4 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/inspiration-geometry.png')]"></div>
      <div className="max-w-6xl mx-auto text-center z-10 space-y-8">
        <motion.h1
          className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          variants={itemVariants}
        >
          Smart Money Management
          <br />
          Made Simple
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Your complete financial companion. Track expenses, manage budgets, and
          grow your wealth with powerful insights and real-time analytics.
        </motion.p>
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          variants={itemVariants}
        >
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 group hover:scale-105"
          >
            Start For Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;

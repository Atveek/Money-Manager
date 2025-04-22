import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <motion.section
      className="py-20 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-xl text-gray-600 mb-12">
          Join millions of users who trust Money Manager for their personal and
          business finances.
        </p>
        <motion.div
          className="flex gap-4 justify-center flex-wrap"
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all flex items-center gap-2 text-lg font-semibold"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTASection;

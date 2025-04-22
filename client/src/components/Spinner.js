import React from "react";
import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 rounded-full border-4 border-t-blue-600 border-r-purple-600 border-b-indigo-600 border-l-blue-200 animate-spin"
          style={{ animationDuration: "1s" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute top-2 left-2 w-12 h-12 rounded-full border-4 border-t-purple-600 border-r-indigo-600 border-b-blue-600 border-l-purple-200"
          style={{ animationDuration: "0.8s" }}
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        />

        <span className="sr-only">Loading...</span>
      </motion.div>

      <motion.span
        className="ml-4 text-gray-700 font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        Loading...
      </motion.span>
    </div>
  );
};

export default Spinner;

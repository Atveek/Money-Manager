import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="relative">
        {/* Outer spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-t-blue-500 border-blue-200 animate-spin"></div>

        <div className="absolute top-1 left-1 w-10 h-10 rounded-full border-4 border-t-indigo-500 border-indigo-200 animate-spin"></div>

        <span className="sr-only">Loading...</span>
      </div>

      <span className="ml-3 text-gray-600 font-medium">Loading...</span>
    </div>
  );
};

export default Spinner;

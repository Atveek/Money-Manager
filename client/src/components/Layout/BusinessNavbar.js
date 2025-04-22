import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers, FaTruck, FaFileInvoiceDollar } from "react-icons/fa";
import "../../styles/BusinessNavbar.css";

export default function BusinessNavbar() {
  return (
    <div className="min-h-screen flex flex-col w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-gray-100 shadow-xl">
      <div className="flex flex-col flex-grow">
        <nav className="flex-1 px-3 py-6 space-y-2">
          <Link
            to="/business/"
            className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-gray-700 hover:text-white group"
          >
            <FaHome className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white" />
            <span>Home</span>
          </Link>
          <Link
            to="/business/customer"
            className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-gray-700 hover:text-white group"
          >
            <FaUsers className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white" />
            <span>Customer</span>
          </Link>
          <Link
            to="/business/supplier"
            className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-gray-700 hover:text-white group"
          >
            <FaTruck className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white" />
            <span>Supplier</span>
          </Link>
          <Link
            to="/business/bills"
            className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 hover:bg-gray-700 hover:text-white group"
          >
            <FaFileInvoiceDollar className="w-5 h-5 mr-3 text-gray-400 group-hover:text-white" />
            <span>Bills</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}

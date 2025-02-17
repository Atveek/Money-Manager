import React from "react";
import { Link } from "react-router-dom";
import "../../styles/BusinessNavbar.css";

export default function BusinessNavbar() {
  return (
    <div className="min-h-screen flex flex-col w-64 bg-gray-800 text-white">
      <div className="flex flex-col flex-grow">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            to="/business/"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            to="/business/customer"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Customer
          </Link>
          <Link
            to="/business/supplier"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Supplier
          </Link>
          <Link
            to="/business/bills"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
          >
            Bills
          </Link>
        </nav>
      </div>
    </div>
  );
}

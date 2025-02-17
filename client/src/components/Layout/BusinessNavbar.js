import React from "react";
import { Link } from "react-router-dom";
import "../../styles/BusinessNavbar.css";

export default function BusinessNavbar() {
  return (
    <div className="sidebar">
      <ul className="nav flex-column text-xl">
        <Link className="nav-link" to="/business/">
          Home
        </Link>
        <li className="nav-item">
          <Link className="nav-link" to="/business/customer">
            Customer
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/business/supplier">
            Supplier
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/business/bills">
            Bills
          </Link>
        </li>
      </ul>
    </div>
  );
}

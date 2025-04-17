import React from "react";
import Header from "./Header";
import BusinessNavbar from "./BusinessNavbar";

export default function BusinessLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-1 p-0">
            <BusinessNavbar />
          </div>
          <div className="col">{children}</div>
        </div>
      </div>
    </div>
  );
}

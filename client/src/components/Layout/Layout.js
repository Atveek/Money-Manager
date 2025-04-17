import React from "react";
import Header from "./Header";
import FooterSection from "../sections/FooterSection";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1 p-4">{children}</div>
      <FooterSection />
    </div>
  );
};

export default Layout;

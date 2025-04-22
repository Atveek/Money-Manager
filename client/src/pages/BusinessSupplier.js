import React, { useState } from "react";
import SupplierDetail from "./SupplierComponents/SupplierDetail";
import Suppliers from "./SupplierComponents/Suppliers";

export default function BusinessSupplier() {
  const [addsupplier, setAddsupplier] = useState(false);
  const [selectedsupplier, setSelectedsupplier] = useState("");
  function changesupplier(values) {
    setSelectedsupplier(values);
  }
  function toggleaddsupplier() {
    setAddsupplier(addsupplier === true ? false : true);
  }
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col-4 m-0 p-1">
          <Suppliers
            toggleaddsupplier={toggleaddsupplier}
            addsupplier={addsupplier}
            changesupplier={changesupplier}
          />
        </div>
        <div className="col-8 m-0 p-1">
          <SupplierDetail
            addsupplier={addsupplier}
            changesupplier={changesupplier}
            toggleaddsupplier={toggleaddsupplier}
            selectedsupplier={selectedsupplier}
          />
        </div>
      </div>
    </div>
  );
}

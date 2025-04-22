import React, { useState } from "react";
import Customers from "./CustomerComponents/Customers";
import CustomerDetail from "./CustomerComponents/CustomerDetail";

export default function BusinessCustomer() {
  const [addcustomer, setAddcustomer] = useState(false);
  const [selectedcustomer, setSelectedcustomer] = useState("");
  function changecustomer(values) {
    setSelectedcustomer(values);
  }
  function toggleaddcustomer() {
    setAddcustomer(addcustomer === true ? false : true);
  }
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col-4 m-0 p-1">
          <Customers
            toggleaddcustomer={toggleaddcustomer}
            addcustomer={addcustomer}
            changecustomer={changecustomer}
          />
        </div>
        <div className="col-8 m-0 p-1">
          <CustomerDetail
            addcustomer={addcustomer}
            changecustomer={changecustomer}
            toggleaddcustomer={toggleaddcustomer}
            selectedcustomer={selectedcustomer}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import TransactionAnalysis from "./TransactionAnalysis";
import ProfitGraph from "./ProfitGraph";

export default function BusinessHome() {
  return (
    <div className="container-fluid m-0 p-0">
      <div className="row">
        <div className="col-sm-6">
          <TransactionAnalysis />
        </div>
        <div className="col-sm-6">
          <ProfitGraph />
        </div>
      </div>
    </div>
  );
}

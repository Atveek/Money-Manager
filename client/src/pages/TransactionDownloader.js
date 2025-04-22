
import React, { useState } from "react";
import axios from "axios";
import DateRangeSelector from "./DateRangeSelector";
import "../styles/transactionDownloader.css";

export default function TransactionDownloader({ customerid, supplierid }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = async (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get("/api/v1/download/csv", {
        params: startDate &&
          endDate && {
            startDate: startDate,
            endDate: endDate,
          },
        headers: {
          customerid: customerid,
          supplierid: supplierid,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV file:", error);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const response = await axios.get("/api/v1/download/pdf", {
        params: {
          startDate: startDate,
          endDate: endDate,
        },
        headers: {
          customerid: customerid,
          supplierid: supplierid,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF file:", error);
    }
  };

  const handleShowDateRangeSelector = () => {
    setIsOpen(true);
  };

  const handleCloseDateRangeSelector = () => {
    setIsOpen(false);
  };

  return (
    <div className="transaction-downloader">
      <button
        className={isOpen ? "close-button" : "download-button"}
        onClick={
          isOpen ? handleCloseDateRangeSelector : handleShowDateRangeSelector
        }
      >
        <img
          style={{ width: "25px" }}
          src={isOpen ? "/Close.png" : "/download.png"}
          alt=""
        />
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <DateRangeSelector onSelect={handleDateSelect} />
          <div className="download-buttons">
            <button className="download-button" onClick={handleDownloadCSV}>
              Download CSV
            </button>
            <button className="download-button" onClick={handleDownloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

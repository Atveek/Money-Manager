import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import "../styles/dateRangeSelector.css";

export default function DateRangeSelector({ onSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function formatDate(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    function handleSelect() {
      onSelect(formatDate(startDate), formatDate(endDate));
    }
    handleSelect();
  }, [startDate, endDate, onSelect]);

  return (
    <div className="date-range-selector">
      <DatePicker
        className="date-picker"
        placeholder="Start Date"
        value={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <DatePicker
        className="date-picker"
        placeholder="End Date"
        value={endDate}
        onChange={(date) => setEndDate(date)}
      />
    </div>
  );
}

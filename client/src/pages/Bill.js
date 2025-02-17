import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Bill = () => {
  const [billDetail, setBillDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBills() {
      try {
        const tokenString = localStorage.getItem("token");
        if (!tokenString) throw new Error("No token found");

        const token = JSON.parse(tokenString);
        const result = await axios.get(`/api/v1/gstBill/${params.id}`, {
          headers: {
            token: token.token,
          },
        });

        console.log(result.data.bills);
        setBillDetail(...result.data.bills);
      } catch (error) {
        console.error("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    }
    getBills();
  }, [params.id]);

  // Default company details
  const CompanyAddress = "Default Company Address";
  const CompanyNumber = "0000000000";
  const email = "default@company.com";
  const gstIn = "DefaultGSTIN";

  const handlePrint = () => {
    const printContent = document.getElementById("print-div"); // Get the specific div
    const printWindow = window.open("", "", "height=600,width=800"); // Open new print window
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(printContent.innerHTML); // Write the content of the div
    printWindow.document.write("</body></html>");
    printWindow.document.close(); // Close the document
    printWindow.print(); // Trigger the print dialog
  };

  function handleNavigate(route) {
    navigate(route);
  }

  if (loading) {
    return <p className="text-center text-lg font-bold">Loading...</p>;
  }

  if (!billDetail) {
    return (
      <p className="text-center text-red-600">Error loading bill details</p>
    );
  }

  return (
    <div>
      <div className="flex w-full justify-between">
        <h1>Bill</h1>
        <div className="flex mb-2 gap-2">
          <button
            className="py-2 px-3 mt-3 bg-blue-800 text-xl text-white rounded-xl"
            onClick={() =>
              handleNavigate(`/business/bills/create/${params.id}`)
            }
          >
            Update Bill
          </button>
          <button
            className="py-2 px-3 mt-3 bg-green-800 text-xl text-white rounded-xl"
            onClick={handlePrint} // Corrected to trigger the print function
          >
            Print Bill
          </button>
        </div>
      </div>
      <div
        className="max-w-full mx-auto bg-white p-6 border shadow-md"
        id="print-div"
        print-div // Attach the reference here
      >
        {/* Header Section */}
        <div className="flex justify-between border-b-2 border-blue-600 pb-4">
          <div>
            <h2 className="text-xl font-bold text-blue-600">
              Company / Seller Name
            </h2>
            <p className="text-gray-600">Address: {CompanyAddress}</p>
            <p className="text-gray-600">Phone No: +91-{CompanyNumber}</p>
            <p className="text-gray-600">Email: {email}</p>
            <p className="text-gray-600">GSTIN: {gstIn}</p>
          </div>
          <div className="text-right">
            <h1 className="text-2xl font-bold text-blue-600">Tax Invoice</h1>
          </div>
        </div>

        {/* Address Section */}
        <div className="mt-4 bg-gray-100 p-4 border">
          <h3 className="text-lg font-semibold">Bill To</h3>
          <p className="font-semibold">{billDetail.name}</p>
          <p className="text-gray-600">Address: 123 Street, City, State</p>
          <p className="text-gray-600">Phone: +91-{billDetail.customerNo}</p>
        </div>

        {/* Items Table */}
        <div className="mt-6">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="border border-gray-300 px-3 py-2">#</th>
                <th className="border border-gray-300 px-3 py-2">Item</th>
                <th className="border border-gray-300 px-3 py-2">Qty</th>
                <th className="border border-gray-300 px-3 py-2">
                  Discount (%)
                </th>
                <th className="border border-gray-300 px-3 py-2">GST (%)</th>
                <th className="border border-gray-300 px-3 py-2">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {billDetail?.items?.map((item, index) => (
                <tr key={index} className="bg-gray-100 odd:bg-white">
                  <td className="border border-gray-300 px-3 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {item.itemName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {item.discount}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    {item.gstPer}
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    ₹{item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="flex justify-end mt-6">
          <div className="w-80 border p-4 bg-gray-100">
            <p className="flex justify-between">
              <span>Sub Total:</span>
              <span>
                ₹
                {billDetail.totalAmount +
                  billDetail.totalDiscount +
                  billDetail.totalGstAmount}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Discount:</span>
              <span>₹{billDetail.totalDiscount}</span>
            </p>
            <p className="flex justify-between">
              <span>SGST:</span>
              <span>₹{billDetail.totalGstAmount / 2}</span>
            </p>
            <p className="flex justify-between">
              <span>CGST:</span>
              <span>₹{billDetail.totalGstAmount / 2}</span>
            </p>
            <p className="flex justify-between">
              <span>IGST:</span>
              <span>₹0</span>
            </p>
            <div className="flex justify-between border-t mt-2 pt-2 font-semibold text-lg">
              <span>Total:</span>
              <span>₹{billDetail.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 text-center border-t pt-4 text-gray-600">
          <p className="font-semibold">Terms & Conditions</p>
          <p>1. Goods once sold will not be taken back.</p>
          <p>2. Subject to City Jurisdiction.</p>
          <p>Company seal and sign</p>
        </div>
      </div>
    </div>
  );
};

export default Bill;

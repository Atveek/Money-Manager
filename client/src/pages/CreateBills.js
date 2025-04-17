import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CreateBills = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirecting after submission
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form states for bill details
  const [customerNo, setCustomerNo] = useState("");
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  // States for current item inputs
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [amount, setAmount] = useState("");
  const [gstPer, setGstPer] = useState("");

  // State to track if an item is being edited
  const [editingIndex, setEditingIndex] = useState(null);

  // If an ID exists, fetch the existing bill data
  useEffect(() => {
    if (id) {
      setLoading(true);
      async function fetchBill() {
        try {
          const tokenString = localStorage.getItem("token");
          if (!tokenString) throw new Error("No token found");
          const token = JSON.parse(tokenString);
          const res = await axios.get(`/api/v1/gstBill/${id}`, {
            headers: { token: token.token },
          });
          // Assume the API returns the bill object in res.data.bill or res.data.bills
          let bill = res.data.bill || res.data.bills;
          bill = bill[0];
          if (bill) {
            setCustomerNo(bill.customerNo);
            setName(bill.name);
            setItems(bill.items || []);
          }
        } catch (error) {
          console.error("Error fetching bill:", error);
        } finally {
          setLoading(false);
        }
      }
      fetchBill();
    }
  }, [id]);

  // Function to add or update an item
  const handleAddOrUpdateItem = () => {
    // Validate required fields
    if (!itemName || !quantity || !discount || !amount || !gstPer) return;

    const newItem = {
      itemName,
      quantity: Number(quantity),
      discount: Number(discount),
      amount: Number(amount),
      gstPer: Number(gstPer),
    };

    if (editingIndex !== null) {
      // Update existing item at editingIndex
      const updatedItems = items.map((item, index) =>
        index === editingIndex ? newItem : item
      );
      setItems(updatedItems);
      setEditingIndex(null);
    } else {
      // Add new item
      setItems([...items, newItem]);
    }

    // Clear current item inputs
    setItemName("");
    setQuantity("");
    setDiscount("");
    setAmount("");
    setGstPer("");
  };

  // Function to load an item into the form for editing
  const handleEditItem = (index) => {
    const itemToEdit = items[index];
    setItemName(itemToEdit.itemName);
    setQuantity(itemToEdit.quantity);
    setDiscount(itemToEdit.discount);
    setAmount(itemToEdit.amount);
    setGstPer(itemToEdit.gstPer);
    setEditingIndex(index);
  };

  // Function to delete an item from the list
  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    // If we are editing this item, reset editing state
    if (editingIndex === index) {
      setEditingIndex(null);
      setItemName("");
      setQuantity("");
      setDiscount("");
      setAmount("");
      setGstPer("");
    }
  };

  // Function to handle form submission (create or update bill)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const billData = {
      customerNo: Number(customerNo),
      name,
      items,
    };

    setSubmitting(true);
    try {
      const tokenString = localStorage.getItem("token");
      if (!tokenString) throw new Error("No token found");
      const token = JSON.parse(tokenString);
      let response;
      if (id) {
        // Update existing bill
        response = await axios.put(`/api/v1/gstBill/${id}`, billData, {
          headers: { token: token.token },
        });
        console.log("Bill updated successfully");
      } else {
        // Create new bill
        response = await axios.post(`/api/v1/gstBill/create-bill`, billData, {
          headers: { token: token.token },
        });
        console.log("Bill created successfully");
      }
      const redirectId = await response.data.message.bill._id;
      // Redirect to bills list (adjust route as needed)
      navigate(`/business/bills/${redirectId}`);
    } catch (error) {
      console.error("Error submitting bill:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
        <p className="ml-2 text-lg font-bold">Loading bill details...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white border shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-blue-600">
        {id ? "Update Bill" : "Create Bill"}
      </h2>

      {/* Customer Details */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">Customer No</label>
          <input
            type="number"
            value={customerNo}
            onChange={(e) => setCustomerNo(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Item Entry */}
      <div className="border p-4 space-y-4">
        <h3 className="text-xl font-semibold">Add Item</h3>
        <div>
          <label className="block text-gray-700">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            placeholder="e.g. Laptop"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Discount (%)</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">GST (%)</label>
            <input
              type="number"
              value={gstPer}
              onChange={(e) => setGstPer(e.target.value)}
              className="mt-1 w-full p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleAddOrUpdateItem}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingIndex !== null ? "Update Item" : "Add Item"}
          </button>
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                // Cancel editing: reset inputs and clear editing state
                setEditingIndex(null);
                setItemName("");
                setQuantity("");
                setDiscount("");
                setAmount("");
                setGstPer("");
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Items List */}
      {items.length > 0 && (
        <div className="border p-4">
          <h3 className="text-xl font-semibold mb-2">Items Added</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-1"
              >
                <span className="font-semibold">
                  {index + 1}. {item.itemName} | Qty: {item.quantity} | ₹
                  {item.amount} | Discount: {item.discount}% | GST:{" "}
                  {item.gstPer}%
                </span>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditItem(index)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {submitting
          ? id
            ? "Updating Bill..."
            : "Creating Bill..."
          : id
          ? "Update Bill"
          : "Submit Bill"}
      </button>
    </form>
  );
};

export default CreateBills;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  CircularProgress,
  Container,
  Typography,
  Paper,
  Grid,
} from "@mui/material";

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
        <CircularProgress />
        <Typography variant="h6" className="ml-2 font-bold">
          Loading bill details...
        </Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper className="p-6 space-y-6">
        <Typography variant="h4" className="text-blue-600">
          {id ? "Update Bill" : "Create Bill"}
        </Typography>

        {/* Customer Details */}
        <div className="space-y-4">
          <TextField
            label="Customer No"
            type="number"
            value={customerNo}
            onChange={(e) => setCustomerNo(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </div>

        {/* Item Entry */}
        <Paper className="p-4 space-y-4">
          <Typography variant="h5">Add Item</Typography>
          <TextField
            label="Item Name"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            placeholder="e.g. Laptop"
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount (₹)"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Discount (%)"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST (%)"
                type="number"
                value={gstPer}
                onChange={(e) => setGstPer(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
          <div className="flex space-x-4">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOrUpdateItem}
            >
              {editingIndex !== null ? "Update Item" : "Add Item"}
            </Button>
            {editingIndex !== null && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  // Cancel editing: reset inputs and clear editing state
                  setEditingIndex(null);
                  setItemName("");
                  setQuantity("");
                  setDiscount("");
                  setAmount("");
                  setGstPer("");
                }}
              >
                Cancel Edit
              </Button>
            )}
          </div>
        </Paper>

        {/* Items List */}
        {items.length > 0 && (
          <Paper className="p-4">
            <Typography variant="h5" className="mb-2">
              Items Added
            </Typography>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-1"
                >
                  <Typography variant="body1" className="font-semibold">
                    {index + 1}. {item.itemName} | Qty: {item.quantity} | ₹
                    {item.amount} | Discount: {item.discount}% | GST:{" "}
                    {item.gstPer}%
                  </Typography>
                  <div className="space-x-2">
                    <Button
                      variant="text"
                      color="primary"
                      onClick={() => handleEditItem(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      color="secondary"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </Paper>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting
            ? id
              ? "Updating Bill..."
              : "Creating Bill..."
            : id
            ? "Update Bill"
            : "Submit Bill"}
        </Button>
      </Paper>
    </Container>
  );
};

export default CreateBills;

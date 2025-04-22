import React, { useState, useEffect } from "react";
import { message } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import { motion } from "framer-motion";

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  const [refresh, setRefresh] = useState(true);

  // Original functions remain exactly the same
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/transections/delete-transection", {
        transacationId: record._id,
      });
      setRefresh(true);
      setLoading(false);
      message.success({
        content: "Transaction Deleted!",
        duration: 1,
      });
    } catch (error) {
      setLoading(false);
      message.error("unable to delete");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user.id);
      setLoading(true);
      setRefresh(true);
      if (editable) {
        await axios.post("/api/v1/transections/edit-transection", {
          payload: {
            ...values,
            userId: user.id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        await axios.post("/api/v1/transections/add-transection", {
          ...values,
          userid: user.id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setRefresh(true);
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("Please fill all fields");
    }
  };

  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/api/v1/transections/get-transection", {
          userid: user.id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);

        setLoading(false);
        setRefresh(false);
      } catch (error) {
        message.error("Fetch Issue With Transaction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransection, refresh]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (amount) => (
        <span className="font-semibold">
          ₹{Number(amount).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (type) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            type === "income"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {type.toUpperCase()}
        </span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex space-x-2">
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
            className="text-blue-500 hover:text-blue-700 cursor-pointer transition-colors"
          />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            className="text-red-500 hover:text-red-700 cursor-pointer transition-colors"
          />
        </div>
      ),
    },
  ];

  return (
    <Layout>
      {loading && <Spinner />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h6 className="text-sm font-medium text-gray-600">
                Select Frequency
              </h6>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="7">Last 1 Week</option>
                <option value="30">Last 1 Month</option>
                <option value="365">Last 1 Year</option>
                <option value="custom">Custom</option>
              </select>
              {frequency === "custom" && (
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedate(e.target.value)}
                  className="w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>

            <div className="space-y-2">
              <h6 className="text-sm font-medium text-gray-600">Select Type</h6>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div className="flex flex-col justify-end space-y-4">
              <div className="flex justify-center space-x-4">
                <UnorderedListOutlined
                  className={`text-2xl cursor-pointer transition-colors ${
                    viewData === "table" ? "text-blue-500" : "text-gray-400"
                  }`}
                  onClick={() => setViewData("table")}
                />
                <AreaChartOutlined
                  className={`text-2xl cursor-pointer transition-colors ${
                    viewData === "analytics" ? "text-blue-500" : "text-gray-400"
                  }`}
                  onClick={() => setViewData("analytics")}
                />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                Add New Transaction
              </button>
            </div>
          </div>
        </motion.div>

        <div className="mt-6">
          {viewData === "table" ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col.title}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {col.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allTransection.map((record) => (
                      <tr key={record._id} className="hover:bg-gray-50">
                        {columns.map((col) => (
                          <td
                            key={col.title}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {col.render
                              ? col.render(record[col.dataIndex], record)
                              : record[col.dataIndex]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <Analytics allTransection={allTransection} />
          )}
        </div>
      </div>

      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {editable ? "Edit Transaction" : "Add New Transaction"}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const values = {
                    amount: formData.get("amount"),
                    type: formData.get("type"),
                    category: formData.get("category"),
                    refrence: formData.get("refrence"),
                    description: formData.get("description"),
                    date:
                      formData.get("date") ||
                      new Date().toISOString().split("T")[0],
                  };
                  handleSubmit(values);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount*
                  </label>
                  <input
                    type="number"
                    name="amount"
                    required
                    defaultValue={editable?.amount}
                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type*
                  </label>
                  <select
                    name="type"
                    required
                    defaultValue={editable?.type || "expense"}
                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Category
  </label>
  <input
    list="category-options"
    name="category"
    defaultValue={editable?.category}
    className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
    placeholder="Select or type a category"
  />
  <datalist id="category-options">
    <option value="salary" />
    <option value="food" />
    <option value="transportation" />
    <option value="entertainment" />
    <option value="shopping" />
    <option value="utilities" />
    <option value="healthcare" />
    <option value="other" />
  </datalist>
</div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference
                  </label>
                  <input
                    type="text"
                    name="refrence"
                    defaultValue={editable?.refrence}
                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter reference"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editable?.description}
                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter description"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date*
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    defaultValue={
                      editable?.date
                        ? new Date(editable.date).toISOString().split("T")[0]
                        : new Date().toISOString().split("T")[0]
                    }
                    className="w-full rounded-lg border-gray-200 p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editable ? "Update" : "Add"} Transaction
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </Layout>
  );
};

export default HomePage;

import React, { useState, useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import img from "./bg.jpeg";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("personal");

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration successful! Please login to continue.");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.role === "personal") {
        navigate("/personal");
      } else {
        navigate("/business");
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {loading && <Spinner />}
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <div className="absolute " />
          <img
            src={img}
            alt="Finance Management"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Money Manager
              </h1>
              <p className="text-gray-600 mt-2">Create your account</p>
            </div>

            <Form
              layout="vertical"
              onFinish={submitHandler}
              className="space-y-4"
              initialValues={{ role: "personal" }}
            >
              <Form.Item
                label={<span className="text-gray-700 font-medium">Name</span>}
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-gray-700 font-medium">Email</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">Password</span>
                }
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                  { min: 6, message: "Password must be at least 6 characters" },
                ]}
              >
                <Input.Password
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Create a secure password"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-gray-700 font-medium">
                    Account Type
                  </span>
                }
                name="role"
                rules={[
                  { required: true, message: "Please select an account type" },
                ]}
              >
                <Select
                  value={selectedRole}
                  onChange={setSelectedRole}
                  className="w-full rounded-lg"
                  options={[
                    { value: "personal", label: "Personal Account" },
                    { value: "business", label: "Business Account" },
                  ]}
                />
              </Form.Item>

              <div className="flex flex-col space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
                >
                  Create Account
                </button>

                <Link
                  to="/login"
                  className="text-center text-black hover:text-gray-700 font-medium transition-colors"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

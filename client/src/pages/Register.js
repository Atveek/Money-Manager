import React, { useState, useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import img from "./login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("personal");

  // Form submission handler
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  // Check if user is already logged in
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <Spinner />}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={img}
            alt="register-img"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-center mb-4">
              Money Manager
            </h1>
            <Form layout="vertical" onFinish={submitHandler}>
              <h2 className="text-xl font-semibold mb-4">Register Form</h2>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </Form.Item>
              <Form.Item
                label="Email"
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
                  type="email"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input
                  type="password"
                  className="w-full px-4 py-2 border rounded-md"
                />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select
                  value={selectedRole}
                  onChange={setSelectedRole}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <Select.Option value="personal">Personal</Select.Option>
                  <Select.Option value="business">Business</Select.Option>
                </Select>
              </Form.Item>
              <div className="flex justify-between items-center mt-4">
                <Link to="/login" className="text-blue-500 hover:underline">
                  Already registered? Login here!
                </Link>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;

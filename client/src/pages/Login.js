import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import img from "./bg.jpeg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Login successful!");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data.token, password: "" })
      );
      if (data.user.role === "personal") navigate("/personal");
      else navigate("/business");
    } catch (error) {
      setLoading(false);
      message.error("Authentication failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {loading && <Spinner />}
      <div className="max-w-4xl w-full flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <div className="absolute" />
          <img
            src={img}
            alt="login-img"
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
              <p className="text-gray-600 mt-2">Please sign in to continue</p>
            </div>

            <Form
              layout="vertical"
              onFinish={submitHandler}
              className="space-y-4"
            >
              <Form.Item
                label={<span className="text-gray-700 font-medium">Email</span>}
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  type="email"
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
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </Form.Item>

              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 transform hover:scale-[1.02]"
                >
                  Sign In
                </button>

                <Link
                  to="/register"
                  className="text-center text-black hover:text-gray-700 font-medium transition-colors"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import img from "./login.jpg";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      localStorage.setItem(
        "token",
        JSON.stringify({ token: data.token, password: "" })
      );
      console.log(data.token);
      if (data.user.role === "personal") navigate("/personal");
      else navigate("/business");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <Spinner />}
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <img
            src={img}
            alt="login-img"
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
              Expense Ease
            </h1>
            <Form layout="vertical" onFinish={submitHandler}>
              <h2 className="text-xl font-semibold mb-4">Login Form</h2>
              <Form.Item label="Email" name="email">
                <Input
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input
                  type="password"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                />
              </Form.Item>
              <div className="flex justify-between items-center mt-4">
                <Link to="/register" className="text-blue-500 hover:underline">
                  Not a user? Click Here to register!
                </Link>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Login
                </button>
              </div>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";
import "../styles/Loginpage.css";
import img from "./login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("personal"); // State to handle selected role

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
    <>
      <div className="login-page ">
        {loading && <Spinner />}
        <div className="row container">
          <h1>
            <center>Money Manager</center>
          </h1>
          <div className="col-md-6">
            <img src={img} alt="login-img" width={"100%"} height="100%" />
          </div>
          <div className="col-md-4 login-form">
            <Form
              // className="register-form"
              // layout="vertical"
              onFinish={submitHandler}
            >
              <h2>Register Form</h2>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input type="text" />
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
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select value={selectedRole} onChange={setSelectedRole}>
                  <Select.Option value="personal">Personal</Select.Option>
                  <Select.Option value="business">Business</Select.Option>
                </Select>
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Link to="/login">Already registered? Login here!</Link>
                <button className="btn" type="submit">
                  Register
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

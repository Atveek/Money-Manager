import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { message } from "antd";
import { motion } from "framer-motion";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <motion.nav
      className="bg-white shadow-lg sticky top-0 w-full z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <motion.div
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative w-10 h-10">
            <motion.img
              src="./budget.png"
              alt="Logo"
              className="w-full h-full object-contain"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <Link
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            to={loginUser.role === "personal" ? "/" : "/business"}
          >
            Money Manager
          </Link>
        </motion.div>

        <div className="flex items-center space-x-6">
          {loginUser && (
            <motion.div
              className="flex items-center px-4 py-2 bg-gray-50 rounded-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <UserOutlined className="text-gray-600 text-xl mr-2" />
              <span className="text-gray-700 font-medium">
                {loginUser.name}
              </span>
            </motion.div>
          )}
          <motion.button
            className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
            onClick={logoutHandler}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogoutOutlined />
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;

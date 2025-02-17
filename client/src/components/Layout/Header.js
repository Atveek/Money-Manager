import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { message } from "antd";

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
    <nav className="bg-white shadow-md sticky top-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-3">
          <img src="./budget.png" alt="Logo" className="h-10" />{" "}
          <Link
            className="text-xl font-semibold text-gray-800"
            to={loginUser.role === "personal" ? "/" : "/business"}
          >
            Money Manager
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {loginUser && (
            <h6 className="flex items-center text-gray-600">
              <UserOutlined className="mr-2" /> {loginUser.name}
            </h6>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={logoutHandler}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;

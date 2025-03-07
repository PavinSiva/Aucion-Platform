import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./navcss.css";
import Logo from "./logo.jpeg";
import logo from "./logofront.jpg";
import { motion } from "framer-motion";

const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "seller",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:3000/user", formData);
      console.log("Response:", response.data);
      alert("Registration successful!");
      navigate("/navigation");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      {/* <div className="logo">
        <img id="logologin" src={Logo} alt="Grey Friday Logo" />
        <h2>Grey Friday</h2>
      </div> */}

      <motion.div
        className="logincontainer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo Section */}
        <motion.div
          id="logoleft"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={logo} alt="" id="logo" />
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} id="form">
            {/* Heading */}
            <motion.div
              className="heading"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Register</h1>
            </motion.div>

            <div className="b-box">
              {/* Input Fields with Staggered Effect */}
              {[
                { name: "fullName", placeholder: "Full Name" },
                { name: "email", placeholder: "Email" },
                { name: "password", placeholder: "Password", type: "password" },
                {
                  name: "confirmPassword",
                  placeholder: "Confirm Password",
                  type: "password",
                },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  className="input-box"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                  />
                  {errors[field.name] && (
                    <p className="error">{errors[field.name]}</p>
                  )}
                </motion.div>
              ))}

              {/* User Type Dropdown */}
              <motion.div
                className="input-box"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label htmlFor="user-type">Are you a:</label>
                <select
                  id="user-type"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="seller">Seller</option>
                  <option value="buyer">Buyer</option>
                </select>
              </motion.div>

              {/* Register Button with Hover Effect */}
              <motion.button
                type="submit"
                id="btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Register
              </motion.button>

              {/* Login Redirect */}
              <motion.div
                className="registerlink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <p>
                  Already have an account?{" "}
                  <button
                    className="register-btn"
                    onClick={() => navigate("/navigation")}
                  >
                    Login
                  </button>
                </p>
              </motion.div>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Registration;

import React, { useState } from "react";
import "./navcss.css";
import Logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./logofront.jpg";
import { motion } from "framer-motion";

const Navigation = ({ setUser }) => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsSeller((prevState) => !prevState);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Login form data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      console.log("Response:", response.data.user.fullName);
      alert("Login successful!");

      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      console.log("Stored user in localStorage:", localStorage.getItem("user"));

      if (!isSeller) {
        navigate("/");
      } else {
        navigate("/seller");
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="nav-bg">
      {/* <div className="logo">
        <img id="logologin" src={Logo} alt="" />
        <h2>Grey Friday</h2>
      </div> */}

      <motion.div
        className="logincontainer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >

        <motion.div
          id="logoleft"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img src={logo} alt="" id="logo" />
        </motion.div>

        <motion.div
          className="wrapper"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <form onSubmit={handleLogin} id="form">
            <motion.div
              className="heading"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Login</h1>
            </motion.div>

            <div className="b-box">
              {[
                { name: "email", placeholder: "Email", type: "text" },
                { name: "password", placeholder: "Password", type: "password" },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  className="input-box"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </motion.div>
              ))}

              <motion.div
                className="remem-forget"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <label id="remember-label">
                  <input type="checkbox" id="remember" /> Remember me
                </label>
                <a href="#" id="forgot-password">
                  Forgot password?
                </a>
              </motion.div>

              <motion.div
                className="check-box"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label id="seller-label">
                  <input
                    type="checkbox"
                    id="isSeller"
                    checked={isSeller}
                    onChange={handleCheckboxChange}
                  />
                  Are you a seller?
                </label>
              </motion.div>

              <motion.button
                type="submit"
                id="btn"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Sign In
              </motion.button>

              <motion.div
                className="registerlink"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <p>
                  Don't have an account?{" "}
                  <button
                    id="register-btn"
                    className="register-btn"
                    onClick={() => navigate("/registration")}
                  >
                    Register
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

export default Navigation;

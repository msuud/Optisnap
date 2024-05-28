import React from "react";
import { useState, useEffect } from "react";
import "./Starter.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";
import axios from "axios";

const LoginForm = ({ setIsLoggedIn }) => {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          formValues,
          "",
          { withCredentials: true }
        );
        console.log(response.data);
        if (response.data == "Email is not verified") {
          alert("Email is not verified");
        } else if (response.data.message == "Authentication Successful") {
          setIsLoggedIn(true);
          navigate("/dashboard");
        } else {
          alert("Invalid Credentials");
        }
      } catch (error) {
        console.error(error);
        alert("Login Failed!");
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email || !values.password) {
      errors.email = "Email is required !";
      alert("Please fill in all required fields.");
    } else if (!regex.test(values.email)) {
      errors.email = "Email is not of the correct format !";
      alert("Email is not of the correct format.");
    }
    if (!values.password) {
      errors.password = "Password is required !";
    } else if (values.password.length < 4) {
      errors.password = "Password should be more than 4 characters !";
      alert("Password should be more than 4 characters.");
    } else if (values.password.length > 10) {
      errors.password = "Password should not exceed 10 characters !";
      alert("Password should not exceed 10 characters.");
    }
    return errors;
  };

  return (
    <div className="bg-login">
      <div className="company-logo1">
        <img src={logo} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      <form className="container-login" onSubmit={handleSubmit}>
        <div className="col form-box login">
          <p className="title">Login</p>
          <div className="input-box">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="button1">
          Login
        </button>
        <button
          className="toggle-form register-link"
          onClick={handleRegisterClick}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

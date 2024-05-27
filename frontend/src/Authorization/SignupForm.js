import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Starter.css";
import logo from "../assets/logo1.png";

const SignupForm = () => {
  const startValues = { username: "", email: "", password: "" };
  const [regformValues, setRegformValues] = useState(startValues);
  const [regformErrors, setRegformErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setRegformValues({ ...regformValues, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setRegformErrors(validation(regformValues));
    setIsSubmitted(true);
  };

  useEffect(() => {
    console.log(regformErrors);
    if (Object.keys(regformErrors).length === 0 && isSubmitted) {
      console.log(regformValues);
      setIsRegistered(true);
      navigate("/verification");
    }
  }, [regformErrors]);

  const validation = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username || !values.email || !values.password) {
      errors.email = "Username is required !";
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
      {Object.keys(regformErrors).length === 0 && isSubmitted ? (
        <div className="ui message success">Registered Successfullly</div>
      ) : null}
      <div className="company-logo1">
        <img src={logo} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      <form className="container">
        <div className="col form-box register">
          <form action="">
            <p className="title">Sign Up</p>
            <div className="input-box">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={regformValues.username}
                onChange={handleChanges}
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={regformValues.email}
                onChange={handleChanges}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={regformValues.password}
                onChange={handleChanges}
              />
            </div>
            <button type="submit" className="button1" onClick={handleOnSubmit}>
              Register
            </button>
            <button
              className="toggle-form register-link"
              onClick={handleLoginClick}
            >
              Already have an account ? Login
            </button>
          </form>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;

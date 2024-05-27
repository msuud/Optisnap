import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Starter.css";
import logo from "../assets/logo1.png";

const VerificationForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 5000);
  });
  return (
    <div className="bg-login">
      <div className="company-logo1">
        <img src={logo} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      <div className="container-new">
        <p className="p-tag">
          Your email has been sent for verification!<br></br>
          Please check your email and verify it.
        </p>
      </div>
    </div>
  );
};

export default VerificationForm;

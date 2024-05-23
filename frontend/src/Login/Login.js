import React, { useState, useEffect } from "react";
import "./Login.css";
import logo1 from "../assets/logo1.png";

const Login = ({ setIsLoggedIn }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleToggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };
  return (
    <div className="bg-login">
      <div className="company-logo1">
        <img src={logo1} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      <div className="container">
        <div className="form-container">
          <h2 className="title">{isLoginActive ? "Login" : "Sign Up"}</h2>
          {isLoginActive ? <LoginForm /> : <SignupForm />}
          <button className="toggle-form" onClick={handleToggleForm}>
            {isLoginActive ? "Create Account" : "Login Instead"}
          </button>
        </div>
      </div>
    </div>
  );
};

function LoginForm() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    // console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

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
    <div>
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message successful">Signed in successfully</div>
      ) : null}

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="col form-box login">
          <form action="">
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
          </form>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>Don't have an account?</p>
        </div>
      </form>
    </div>
  );
}

function SignupForm({ setIsLoggedIn }) {
  const startValues = { username: "", email: "", password: "" };
  const [regformValues, setRegformValues] = useState(startValues);
  const [regformErrors, setRegformErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      // setIsLoggedIn(true);
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
    <div>
      {Object.keys(regformErrors).length === 0 && isSubmitted ? (
        <div className="ui message success">Registered Successfullly</div>
      ) : null}
      <form className="signup-form">
        <div className="col form-box register">
          <form action="">
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
            <button type="submit" onClick={handleOnSubmit}>
              Register
            </button>
          </form>
        </div>
      </form>
    </div>
  );
}

export default Login;

import React, { useState } from 'react'
import './Login.css';
import Dashboard from '../Dashboard/Dashboard';

const Login = ({setIsLoggedIn}) => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const handleToggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };
  return (    
    <div className="bg-login">
    <div className="container">
      <div className="form-container">
        <h1 className="title">{isLoginActive ? 'Login' : 'Sign Up'}</h1>
        {isLoginActive ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}
        <button className="toggle-form" onClick={handleToggleForm}>
          {isLoginActive ? 'Create Account' : 'Login Instead'}
        </button>
      </div>
    </div>
    </div>
  )
}
function LoginForm() {
  return (
    <form className="login-form">
      <div className="col form-box login">
        <form action="">
          <div className="input-box">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
        </form>
      </div>
      <button type="submit">Login</button>
      <div className="register-link">
           <p>Don't have an account?</p>                                        
          </div>
    </form>
  );
}

function SignupForm() {
  return (
    <form className="signup-form">
       <div className="col form-box register">
        <form action="">

          <div className="input-box">
            <input type="text" placeholder="Username" required />
          </div>
          <div className="input-box">
            <input type="email" placeholder="Email" required />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Register</button>
        </form>
</div>
    </form>
  );
}


export default Login

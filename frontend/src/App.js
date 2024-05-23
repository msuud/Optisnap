import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./About-us/aboutus";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <div>
            <div className="d-flex flex-row min-vh-100 page-cointainer">
              <Navbar />
            <div className="container-fluid dashboard content-cointainer mt-0 px-0 content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} className="dashboard" />
                <Route path="/about-us" element={<AboutUs />}  className="dashboard"/>
              </Routes>
            </div>
          </div>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
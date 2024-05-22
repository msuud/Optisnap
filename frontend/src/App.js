import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
          <div className="main-layout">
            <div className="navbar">
              <Navbar />
            </div>
            <div className="dashboard">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
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
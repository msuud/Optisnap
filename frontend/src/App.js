import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./About-us/aboutus";
import SignupForm from "./Authorization/SignupForm";
import LoginForm from "./Authorization/LoginForm";
import VerificationForm from "./Authorization/VerificationForm";
import Profile from "./Profile/Profile";
import Workspace from "./Workspace/Workspace";
import WorkspaceUser from "./Workspace/WorkspaceUser";
import db from "./Workspace/db.json"
import WorkspaceDetails from "./Workspace/WorkspaceDetails";
import PopupForm from "./PopupForm";

function App() {
  const [data, setData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const client = localStorage.getItem("client");
    if (client) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false); 
  };

  // fetch
  const getData = async () => {
    try {
      const response = await fetch("db.json", {
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
      });
      const myjson = await response.json();
      setData(myjson);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors (e.g., display an error message)
    }
  };

  useEffect(() => {
    getData(); // Fetch data on component mount
  }, []); // Empty dependency array


  return (
    <div className="App">
      <BrowserRouter>
      {/* {console.log("Data in App:", data)} */}
      {data.map((val) => (
          <Route
            key={val.id}
            path={`/${val.title}`}
            element={<WorkspaceDetails title={val.title} />}
          />
        ))}
        {isLoggedIn ? (
          <div>
            <div className="d-flex flex-row min-vh-100 ">
              <Navbar  handleLogout={handleLogout}/>
              <div className="container-fluid dashboard content-cointainer mt-0 px-0">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/workspace" element={<Workspace />} />
                  <Route path="/workspace-user" element={<WorkspaceUser />} />
                </Routes>
              </div>
            </div>
          </div>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
            />{" "}
            <Route path="/" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/verification" element={<VerificationForm />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

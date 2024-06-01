import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./About-us/aboutus";
import SignupForm from "./Authorization/SignupForm";
import LoginForm from "./Authorization/LoginForm";
import Profile from "./Profile/Profile";
import WorkspaceUser from "./Workspace/WorkspaceUser";
import db from "./Workspace/db.json";
import WorkspaceDetails from "./Workspace/WorkspaceDetails";
import {AuthContext} from "./Contexts/AuthContext";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(db);
    // console.log(isLoggedIn);
  }, []);

  return (
    <div className="App">
        <BrowserRouter>
          {isLoggedIn ? (
            <div>
              <div className="d-flex flex-row min-vh-100 ">
                <Navbar />
                <div className="container-fluid dashboard content-cointainer mt-0 px-0">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/workspace-user" element={<WorkspaceUser />} />
                    <Route
                      path="/workspace-user/:id"
                      element={<WorkspaceDetails data={data} />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<SignupForm />} />
            </Routes>
          )}
        </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/About-us/aboutus";
import SignupForm from "./components/Authorization/SignupForm";
import LoginForm from "./components/Authorization/LoginForm";
import Profile from "./components/Profile/Profile";
import WorkspaceUser from "./components/Workspace/WorkspaceUser";
import WorkspaceDetails from "./components/Workspace/WorkspaceDetails";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";

function App() {
  // function getCookie(cname) {
  //   const name = cname + "=";
  //   const decodedCookie = decodeURIComponent(document.cookie);
  //   const ca = decodedCookie.split(";");
  //   for (let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === " ") {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return null;
  // }

  const { isLoggedIn } = useContext(AuthContext);

  const [workspaceData, setWorkspaceData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:4000/pic/workspace",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setWorkspaceData(response.data.data);
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <div>
            <div className="d-flex flex-row min-vh-100 ">
              <Navbar />
              <div className="container-fluid dashboard content-cointainer mt-0 px-0">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/workspace-user" element={<WorkspaceUser />} />
                  <Route
                    path="/workspace-user/:WSname"
                    element={<WorkspaceDetails />}
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

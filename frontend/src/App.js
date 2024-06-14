import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/About-us/aboutus";
import SignupForm from "./components/Authorization/SignupForm";
import LoginForm from "./components/Authorization/LoginForm";
import Profile from "./components/Profile/Profile";
import WorkspaceUser from "./components/Workspace/WorkspaceUser";
import WorkspaceDetails from "./components/Workspace/WorkspaceDetails";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

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

import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import AboutUs from "./components/About-us/aboutus";
import SignupForm from "./components/Authorization/SignupForm";
import LoginForm from "./components/Authorization/LoginForm";
import Profile from "./components/Profile/Profile";
import WorkspaceUser from "./components/Workspace/WorkspaceUser";
import db from "./components/Workspace/db.json";
import WorkspaceDetails from "./components/Workspace/WorkspaceDetails";

const AuthContext = createContext(null);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("accessToken");
    return token ? true : false;
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(db);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          {isLoggedIn ? (
            <div>
              <div className="d-flex flex-row min-vh-100 ">
                <Navbar handleLogout={handleLogout} />
                <div className="container-fluid dashboard content-cointainer mt-0 px-0">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
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
            // Conditional rendering for login/signup
            <Routes>
              <Route
                path="/login"
                element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/" element={<SignupForm />} />
              <Route path="/login" element={<LoginForm />} />{" "}
              {/* Remove duplicate */}
            </Routes>
          )}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

function ProtectedRoute({ children, ...rest }) {
  const authContext = useContext(AuthContext);

  return authContext.isLoggedIn ? (
    <Route {...rest}>{children}</Route>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default App;

import React, { useState, createContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
});

function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) return;
        const response = await axios.get("http://localhost:4000/checkAuth", {
          withCredentials: true,
        });
        if ((response.data.message = "Authenticated Successfully")) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user data : ", error);
      }
    };

    fetchUser();
  }, [isLoggedIn]);
  const value = { isLoggedIn, setIsLoggedIn, handleLogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthContextProvider };

import React, { createContext, useState,useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  isLoggedIn: null,
  setIsLoggedIn: () => { },
});

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get("http://localhost:4000/user", {
          withCredentials: true,
        });
        // console.log("res: ",res);
        setIsLoggedIn(true);
      } catch (err) {
        // console.log("err: ",err);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };

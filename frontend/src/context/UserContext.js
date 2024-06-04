import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);

  const updateFirstName = (newFirstName) =>
    setUser((prevUser) => ({ ...prevUser, firstName: newFirstName }));
  const updateLastName = (newLastName) =>
    setUser((prevUser) => ({ ...prevUser, lastName: newLastName }));
  const updateUsername = (newUsername) =>
    setUser((prevUser) => ({ ...prevUser, username: newUsername }));
  const updateEmail = (newEmail) =>
    setUser((prevUser) => ({ ...prevUser, email: newEmail }));
  const updateWorkspaces = (newWorkspaces) =>
    setUser((prevUser) => ({ ...prevUser, workspaces: newWorkspaces }));
  const updateImages = (newImages) =>
    setUser((prevUser) => ({ ...prevUser, images: newImages }));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get("http://localhost:4000/user", {
          withCredentials: true,
        });
        // console.log(response.data.data);
        setUser(response.data.data);
      } catch (error) {
        // console.error("Error fetching user data : ", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        updateFirstName,
        updateLastName,
        updateEmail,
        updateUsername,
        updateWorkspaces,
        updateImages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const initialState = {
  WSname: "",
  Images: 0,
};

const WorkspaceContext = createContext(initialState);

const WorkspaceProvider = ({ children }) => {
  const [editWorkspace, setEditWorkspace] = useState(initialState);

  const updateWSname = (newWSname) =>
    setEditWorkspace((prevWS) => ({ ...prevWS, WSname: newWSname }));
  const updateImages = (newImages) =>
    setEditWorkspace((prevWS) => ({ ...prevWS, Images: newImages }));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:4000/pic/workspace",
          {
            withCredentials: true,
          }
        );
        setEditWorkspace(response.data.data);
      } catch (error) {
        // console.error("Error fetching user data : ", error);
      }
    };
    fetchUser();
  }, []);
  return (
    <WorkspaceContext.Provider
      value={{
        editWorkspace,
        setEditWorkspace,
        updateWSname,
        updateImages,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export { WorkspaceProvider, WorkspaceContext };

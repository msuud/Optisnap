import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Workspace.css";
import db from "./db.json";
import WorkspaceDetails from "./WorkspaceDetails";
import { useNavigate } from "react-router-dom";
import PopupForm from "./PopupForm";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DropdownWorkspace from "./DropdownWorkspace";
import axios from "axios";

const WorkspaceUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData, setIsLoggedIn] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // New state variable for dropdown visibility
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   setData(db);
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch("http://localhost:4000/pic", {
  //       method: "GET",
  //     });
  //     console.log(response);
  
      
  //     await new Promise((resolve) => setTimeout(resolve, 4000));
  
  //     const responseData = await response.json();
  //     setData(responseData);
  //   };
  
  //   fetchData();
  // }, []);

  const handleDropdownClick = (workspaceId) => {
    setShowDropdown(!showDropdown);
    setSelectedWorkspaceId(workspaceId);
  };

  const handleLinkClick = (event, workspaceId) => {
    if (event.target.tagName !== "BUTTON") {
      navigate(`/workspace-user/${workspaceId}`);
    }
  };

  const onClose = () => {
    setShowModel(false);
  };

  const handleworkspace = () => {
    setShowModel(false);
    navigate("/workspace-user");
  };
  useEffect(()=>{
    const fetchData =async()=>{
      try {
        const response= await axios.get("http://localhost:4000/pic/workspace",
          {withCredentials: true}
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  },[]);

  return (
    <div className="bg-image1 rounded box4 ">
      {console.log("Data in App:", db)}
      <div className="cointainer">
        <h1 className="heading1">Your Workspaces</h1>
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <div className="app1">
            {db &&
              db.length > 0 &&
              db.map((val) => {
                return (
                  <div key={val.id} className="workspace-box">
                    <div className="workspace-co">
                    <button className="three-button" onClick={() => handleDropdownClick(val.id)}>
                      <MoreVertIcon />
                    </button>
                    {showDropdown && selectedWorkspaceId === val.id && (
                      <DropdownWorkspace
                        onClose={() => setShowDropdown(false)} 
                      />
                    )}</div>  
                    <Link
                      to={`/workspace-user/${val.id}`}
                      onClick={(event) => handleLinkClick(event, val.id)}
                      className="workspace-text"
                    >
                      <h2 >{val.title}</h2>
                      <h4 className="mt-3">Images: {val.images}</h4>
                    </Link>
                  </div>
                );
              })}
            <div
              className="workspace-box create-workspace"
              onClick={() => setShowModel(true)}
            >
              <div className="mx-2">
                <h2>
                  +<br />
                </h2>
              </div>
              <br />
              <div>
                <h3>create workspace</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <PopupForm onClose={onClose} handleworkspace={handleworkspace} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceUser;

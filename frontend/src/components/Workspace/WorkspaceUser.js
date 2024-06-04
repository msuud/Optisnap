import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Workspace.css";
import { useNavigate } from "react-router-dom";
import PopupForm from "./PopupForm";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DropdownWorkspace from "./DropdownWorkspace";
import axios from "axios";

const WorkspaceUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData, setIsLoggedIn] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // New state variable for dropdown visibility
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const navigate = useNavigate();

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

  const [workspaceDetails, setWorkspaceDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/pic/workspace",
          {
            withCredentials: true,
          }
        );
        setWorkspaceDetails(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-image1 rounded box4 ">
      <div className="cointainer">
        <h1 className="heading1">Your Workspaces</h1>
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <div className="app1">
            {workspaceDetails.length > 0 &&
              workspaceDetails.map((workspaceDetails) => {
                return (
                  <div key={workspaceDetails.name} className="workspace-box">
                    <div>
                      <button
                        className="three-button"
                        onClick={() =>
                          handleDropdownClick(workspaceDetails.name)
                        }
                      >
                        <MoreVertIcon />
                      </button>
                      {showDropdown &&
                        selectedWorkspaceId === workspaceDetails.name && (
                          <DropdownWorkspace
                            onClose={() => setShowDropdown(false)}
                            workspaceDetails={workspaceDetails}
                          />
                        )}
                    </div>
                    <Link
                      to={`/workspace-user/${workspaceDetails.name}`}
                      onClick={(event) =>
                        handleLinkClick(event, workspaceDetails.name)
                      }
                      className="workspace-text"
                    >
                      <h2>{workspaceDetails.name}</h2>
                      <h4 className="mt-5">
                        Images: {workspaceDetails?.images?.length || 0}
                      </h4>
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
            <PopupForm onClose={() => setShowModel(false)} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceUser;

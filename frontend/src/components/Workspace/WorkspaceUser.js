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
  const [showModel, setShowModel] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);
  const [workspaceDetails, setWorkspaceDetails] = useState([]);
  const [updatedWorkspaceNames, setUpdatedWorkspaceNames] = useState({});

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

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest(".workspace-box")) {
      setShowDropdown(false);
    }
  };

  const onClose = () => {
    setShowModel(false);
  };

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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  const updateWorkspaceName = (oldName, newName) => {
    setUpdatedWorkspaceNames((prev) => ({ ...prev, [oldName]: newName }));
  };

  const addNewWorkspace = (name) => {
    setWorkspaceDetails((prev) => [...prev, { name, images: [] }]);
  };

  const removeWorkspace = (name) => {
    setWorkspaceDetails((prev) => prev.filter((ws) => ws.name !== name));
  };

  return (
    <div className="bg-image1 rounded box4">
      <div className="cointainer">
        <h1 className="heading1">Your Workspaces</h1>
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <div className="app1">
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="workspace-box skeleton">
                    <div className="workspace-text1">
                      <h2 className="h2-skeleton">Name</h2>
                      <h4 className="mt-3 h2-skeleton">Images:</h4>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              workspaceDetails.length > 0 &&
              workspaceDetails.map((workspaceDetails) => {
                const displayName =
                  updatedWorkspaceNames[workspaceDetails.name] ||
                  workspaceDetails.name;
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
                            updateWorkspaceName={updateWorkspaceName}
                            removeWorkspace={removeWorkspace}
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
                      <h2>{displayName}</h2>
                      <h4 className="mt-3">
                        Images: {workspaceDetails?.images?.length || 0}
                      </h4>
                    </Link>
                  </div>
                );
              })
            )}
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
            <PopupForm
              onClose={() => setShowModel(false)}
              addNewWorkspace={addNewWorkspace}
            />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceUser;

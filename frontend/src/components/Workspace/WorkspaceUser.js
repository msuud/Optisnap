import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      navigate(`/workspace-user/${workspaceId}` );
    }
  };

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest('.workspace-box')) {
      setShowDropdown(false);
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
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        // settime out: set in order see skelton loading 
        // setIsLoading(false); 
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
      <div className='bg-local rounded box4 h-screen flex justify-center bg-cover bg-[url("https://muhimasri.com/static/04801e8519572c753d0793e343bce955/cfc03/mui-disabled-button-colors.avif")]' >
      <div className=" text-white">
        <h1 className="text-5xl font-bold text-green-800 mb-4 mt-7 animate-slide-in">Your Workspaces</h1>
        <div className=" grid-cols-3 gap-4 mt-5 justify-center">
          <div className="flex flex-wrap justify-center">
            {isLoading ? (
              <>
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="skeleton bg-green-500 bg-opacity-20 p-6 rounded-xl m-2 w-80 h-40">
                    <div className="">
                      <h2 className="h2-skeleton bg-green-500 bg-opacity-40 text-transparent rounded-lg">Name</h2>
                      <h4 className="mt-3 h2-skeleton bg-green-500 bg-opacity-40 text-transparent rounded-lg">Images:</h4>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              workspaceDetails.length > 0 &&
              workspaceDetails.map((workspaceDetails) => (
                <div key={workspaceDetails.name} className="workspace-box bg-green-700 bg-opacity-80 p-6 rounded-xl m-6 flex flex-col justify-between w-80 h-44">
                  <div className="flex justify-between items-start">
                    <button
                      className="bg-transparent border-none"
                      onClick={() => handleDropdownClick(workspaceDetails.name)}
                    >
                      <MoreVertIcon />
                    </button>
                    {showDropdown && selectedWorkspaceId === workspaceDetails.name && (
                      <DropdownWorkspace
                        onClose={() => setShowDropdown(false)}
                        workspaceDetails={workspaceDetails}
                      />
                    )}
                  </div>
                  <Link
                    to={`/workspace-user/${workspaceDetails.name}`}
                    onClick={(event) => handleLinkClick(event, workspaceDetails.name)}
                    className="workspace-text text-white no-underline mt-2"
                  >
                    <h1 className="truncate text-4xl text-white font-bold">{workspaceDetails.name}</h1>
                    <h1 className="mt-3 text-2xl text-white font-normal">Images: {workspaceDetails?.images?.length || 0}</h1>
                  </Link>
                </div>
              ))
            )}
            <div
              className=" bg-opacity-20 border-2 border-green-500 border-dashed bg-green-900  flex flex-col justify-between p-6 rounded-xl m-6 cursor-pointer w-80 h-44"
              onClick={() => setShowModel(true)}
            >
              <div className="text-center">
                <h2 className="text-4xl">+</h2>
                <h3>Create Workspace</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className="popup-modal fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
          <div className="popup-form-container bg-white p-4 rounded-lg">
            <PopupForm onClose={() => setShowModel(false)} />
          </div>
          <div className="popup-backdrop fixed inset-0" onClick={onClose} />
        </div>
      )}
    </div>
  );
};
export default WorkspaceUser;
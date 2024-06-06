import React, { useState } from "react";
import "./Dropdown.css";
import EditWorkspace from "./EditWorkspace";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DropdownWorkspace = ({ workspaceDetails }) => {
  const [editForm, setEditForm] = useState(false);
  const onClose = () => {
    setEditForm(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this workspace ?")) {
      try {
        // toast.success("Workspace is being deleted!");
        const response = await axios.get(
          `http://localhost:4000/pic/deleteWS/${workspaceDetails.name}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);
        if (response.data.message == "WorskSpace deleted") {
          alert("Workspace deleted successfully !");
          window.location.reload();
        } else if (response.data.success === false && response.status === 200) {
          alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <ul className="workspace-list">
        <li>
          <button className="workspace-btn" onClick={() => setEditForm(true)}>
            Edit Workspace
          </button>
        </li>
        <li>
          <button className="workspace-btn" onClick={handleDelete}>
            Delete Workspace
          </button>
        </li>
      </ul>
      {editForm && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <EditWorkspace
              onClose={onClose}
              workspaceDetails={workspaceDetails}
            />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default DropdownWorkspace;

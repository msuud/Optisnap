import React, { useState } from "react";
import "./Dropdown.css";
import EditWorkspace from "./EditWorkspace";
import axios from "axios";

const DropdownWorkspace = ({ workspaceDetails }) => {
  const [editForm, setEditForm] = useState(false);
  const onClose = () => {
    setEditForm(false);
    window.location.reload();
  };

  const handleDelete = async () => {
    try {
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
      }
    } catch (error) {
      console.error(error);
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
    </div>
  );
};

export default DropdownWorkspace;

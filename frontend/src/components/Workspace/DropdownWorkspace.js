import React, { useState } from "react";
import "./Dropdown.css";
import EditWorkspace from "./EditWorkspace";
import axios from "axios";

const DropdownWorkspace = ({
  workspaceDetails,
  updateWorkspaceName,
  removeWorkspace,
}) => {
  const [editForm, setEditForm] = useState(false);
  const onClose = () => {
    setEditForm(false);
    // window.location.reload();
  };

  const handleDelete = async () => {
    try {
      removeWorkspace(workspaceDetails.name);
      const response = await axios.get(
        `http://localhost:4000/pic/deleteWS/${workspaceDetails.name}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.message === "WorskSpace deleted") {
        alert("Workspace deleted successfully !");
      } else if (response.data.success === false && response.status === 200) {
        alert(response.data.message);
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
              updateWorkspaceName={updateWorkspaceName}
            />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default DropdownWorkspace;

import React, { useState } from "react";
import "./Workspace.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PopupForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState("");

  const handleChange = (event) => {
    setWorkspaceName(event.target.value);
  };

  const handleCreateWorkspace = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/pic/addWS",
        { name: workspaceName },
        { withCredentials: true }
      );
      if (response.data.message == "Workspace Added!") {
        onClose();
        alert("Workspace created! The page will refresh shortly.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <h4>Workspace Name</h4>
          </Modal.Title>
          <button onClick={onClose} className="Button-form">
            <CloseButton />
          </button>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={(event) => event.preventDefault()}>
            {" "}
            <input
              type="text"
              placeholder="Enter Workspace Name"
              className="pop-placeholder"
              value={workspaceName}
              onChange={handleChange}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="button" onClick={handleCreateWorkspace}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default PopupForm;

import React, { useState } from "react";
import "./Workspace.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";

const EditWorkspace = ({ onClose, handleworkspace }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(""); // Track input value

  const handleChange = (event) => {
    setInputValue(event.target.value); // Update state on input change
  };

  // Disable "Save changes" button based on input value
  const isSaveButtonDisabled = inputValue.trim() === ""; // Check for empty or whitespace

  const handleworkspace1 = () => {
    navigate("/workspace-user");
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <h4>Edit Workspace Name</h4>
          </Modal.Title>
          <button onClick={onClose} className="Button-form">
            <CloseButton />
          </button>
        </Modal.Header>

        <Modal.Body>
          <form>
            <input
              type="text"
              placeholder="Edit Workspace Name"
              className="pop-placeholder"
              value={inputValue} // Bind input value to state
              onChange={handleChange} // Update state on input change
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="submit"
            onClick={handleworkspace}
            disabled={isSaveButtonDisabled} // Disable button conditionally
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default EditWorkspace;

import React, { useState } from "react";
import "./Workspace.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditWorkspace = ({ onClose, workspaceDetails }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const isSaveButtonDisabled = inputValue.trim() === "";

  const handleworkspace = async () => {
    try {
      const response = await axios.patch(
        "http://localhost:4000/pic/editWS",
        {
          name: workspaceDetails.name,
          newName: inputValue,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success === false) {
        alert("Workspace name already exists");
      }
    } catch (error) {
      console.error(error);
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
              value={inputValue}
              onChange={handleChange}
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

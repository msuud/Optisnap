import React from "react";
import "./Workspace/Workspace.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";

const PopupForm = ({ onClose, handleworkspace }) => {
  const navigate = useNavigate();

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
            <h4>Workspace Name</h4>
          </Modal.Title>
          <button onClick={onClose} className="Button-form">
            <CloseButton />
          </button>
        </Modal.Header>

        <Modal.Body>
          <form>
            <input
              type="text"
              placeholder="Enter Workspace Name"
              className="pop-placeholder"
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" onClick={handleworkspace1}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default PopupForm;

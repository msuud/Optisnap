import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import "./UploadImage.css";

const UploadImage = ({ onClose, handleworkspace }) => {
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
            <h4>Upload image</h4>
          </Modal.Title>
          <button onClick={onClose} className="Button-form">
            <CloseButton />
          </button>
        </Modal.Header>

        <Modal.Body>
          <form>
            Name:{" "}
            <input
              type="text"
              placeholder="Enter Image Name"
              className="pop-placeholder"
            />
            Choose Image:
            <br />
            <input type="file" />
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

export default UploadImage;

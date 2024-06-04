import React, { useState, useEffect } from "react";
import "../Workspace/Workspace.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getLinearProgressUtilityClass } from "@mui/material";

const ProfileForm = ({ onClose }) => {
  const navigate = useNavigate();

  const [firstNameFilled, setFirstNameFilled] = useState(false);
  const [lastNameFilled, setLastNameFilled] = useState(false);
  const [usernameFilled, setUsernameFilled] = useState(false);

  const handleInputChange = (event) => {
    const inputName = event.target.name;
    const value = event.target.value;

    switch (inputName) {
      case "firstName":
        setFirstNameFilled(value.trim() !== "");
        break;
      case "lastName":
        setLastNameFilled(value.trim() !== "");
        break;
      case "username":
        setUsernameFilled(value.trim() !== "");
        break;
      default:
        break;
    }
  };
  const firstNameClick=(event)=>{
    // Call backend db
    event.preventDefault();
  }
  const lastNameClick=(event)=>{
    // Call backend db
    event.preventDefault();
  }
  const usernameClick=(event)=>{
    // Call backend db
    event.preventDefault();
  }

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <h4>Edit Profile</h4>
          </Modal.Title>
          <button onClick={onClose} className="Button-form">
            <CloseButton />
          </button>
        </Modal.Header>

        <Modal.Body>
          <form>
            <input
              type="text"
              placeholder="Enter First Name"
              className="pop-placeholder w-50 m-3"
              name="firstName"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              disabled={!firstNameFilled}
              className="button mx-4"
              onClick={firstNameClick}
            >
              Save changes
            </Button>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="pop-placeholder w-50 m-3"
              name="lastName"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              disabled={!lastNameFilled}
              className="button mx-4"
              onClick={lastNameClick}
            >
              Save changes
            </Button>
            <input
              type="text"
              placeholder="Enter Username"
              className="pop-placeholder w-50 m-3"
              name="username"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              disabled={!usernameFilled}
              className="button mx-4"
              onClick={usernameClick}
            >
              Save changes
            </Button>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

export default ProfileForm;

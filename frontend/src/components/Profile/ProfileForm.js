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

  const handleChangesClick = async (event, field) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4000/update/${field}`,
        {
          name: document.getElementById(field).value,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success === false) {
        alert("Username already exists");
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
              id="firstName"
            />
            <Button
              type="submit"
              disabled={!firstNameFilled}
              className="button mx-4"
              onClick={(event) => handleChangesClick(event, "firstName")}
            >
              Save changes
            </Button>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="pop-placeholder w-50 m-3"
              name="lastName"
              onChange={handleInputChange}
              id="lastName"
            />
            <Button
              type="submit"
              disabled={!lastNameFilled}
              className="button mx-4"
              onClick={(event) => handleChangesClick(event, "lastName")}
            >
              Save changes
            </Button>
            <input
              type="text"
              placeholder="Enter Username"
              className="pop-placeholder w-50 m-3"
              name="username"
              onChange={handleInputChange}
              id="username"
            />
            <Button
              type="submit"
              disabled={!usernameFilled}
              className="button mx-4"
              onClick={(event) => handleChangesClick(event, "username")}
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

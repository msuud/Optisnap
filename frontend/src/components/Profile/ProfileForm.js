import React, { useState, useEffect, useContext } from "react";
import "../Workspace/Workspace.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getLinearProgressUtilityClass } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import ModalFooter from "react-bootstrap/esm/ModalFooter";

const ProfileForm = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  });

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleChangesClick = async (event) => {
    event.preventDefault();
    try {
      console.log(profile);
      setUser({
        ...user,
        ...profile,
      });
      const response = await axios.patch(
        `http://localhost:4000/update`,
        profile,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success === false) {
        alert("Username already exists");
      }
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog style={{ width: "25%" }}>
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
              placeholder={user.firstName}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              name="firstName"
              onChange={(e) => handleInputChange(e, "firstName")}
              id="firstName"
            />

            <input
              type="text"
              placeholder={user.lastName}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              name="lastName"
              onChange={(e) => handleInputChange(e, "lastName")}
              id="lastName"
            />

            <input
              type="text"
              placeholder={user.username}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              name="username"
              onChange={(e) => handleInputChange(e, "username")}
              id="username"
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="button mx-4"
            onClick={(event) => handleChangesClick(event)}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default ProfileForm;
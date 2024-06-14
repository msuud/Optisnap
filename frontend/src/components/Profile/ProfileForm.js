import React, { useState, useEffect, useContext } from "react";
import "../Workspace/Workspace.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { UserContext } from "../../context/UserContext";

const ProfileForm = ({ onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  });

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
  });

  const handleInputChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleChangesClick = async (event) => {
  const handleChangesClick = async (event) => {
    event.preventDefault();
    try {
      console.log(profile);
      setUser({
        ...user,
        ...profile,
      });
      console.log(profile);
      setUser({
        ...user,
        ...profile,
      });
      const response = await axios.patch(
        `http://localhost:4000/update`,
        profile,
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
              placeholder={user.firstName}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              name="firstName"
              onChange={(e) => handleInputChange(e, "firstName")}
              onChange={(e) => handleInputChange(e, "firstName")}
              id="firstName"
            />


            <input
              type="text"
              placeholder={user.lastName}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              placeholder={user.lastName}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              name="lastName"
              onChange={(e) => handleInputChange(e, "lastName")}
              onChange={(e) => handleInputChange(e, "lastName")}
              id="lastName"
            />


            <input
              type="text"
              placeholder={user.username}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              placeholder={user.username}
              className="pop-placeholder m-3"
              style={{ width: "80%" }}
              name="username"
              onChange={(e) => handleInputChange(e, "username")}
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
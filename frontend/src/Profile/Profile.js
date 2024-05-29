import React from "react";
import "./Profile.css";
import axios from "axios";

const Profile = ({ email, username, numWorkspaces, numImages }) => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="bg-image rounded d-flex flex-column justify-content-center">
      <div className="image-overlay">
        <div className="container profile-grid d-flex flex-column">
          <div className="profile-grid1">
            <h1 className="h1">Priyanshi Adhwaryu</h1>
            <h3>Email :- urvadave2@gmail.com</h3> {email}
            <h3>Username :- urvadave2</h3> {username}
          </div>
          {/* <button className="edit-profile" onClick={handleClick}>
            Edit Profile
          </button> */}
          <div className="profile-grid2">
            <button className="workspace-grid">Number of Workspaces</button>{" "}
            {numWorkspaces}
            <button className="image-grid">Number of Images</button> {numImages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

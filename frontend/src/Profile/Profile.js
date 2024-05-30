import React from "react";
import "./Profile.css";
import axios from "axios";
import profileData from "./Profile.json";

const Profile = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="bg-image rounded d-flex flex-column justify-content-center">
      <div className="image-overlay">
        <div className="container profile-grid d-flex flex-column">
          <div className="container1">
            <h1 className="h1">
              {profileData.firstName}
              <br></br>
              {profileData.lastName}
            </h1>
            <br></br>
            <h3>Email :- {profileData.email}</h3>
            <h3>Username :- {profileData.username}</h3>
          </div>
          {/* <button className="edit-profile" onClick={handleClick}>
            Edit Profile
          </button> */}
          <div className="container2">
            <button className="workspace-grid">
              No. of Workspaces :- {profileData.workspaces}
            </button>{" "}
            <button className="image-grid">
              No. of Images :- {profileData.images}
            </button>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

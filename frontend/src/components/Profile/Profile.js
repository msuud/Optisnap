import React, { useState, useEffect } from "react";
import "./Profile.css";
import profileData from "./Profile.json";
import ProfileForm from "./ProfileForm";
import "../Workspace/Workspace.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      const response = await fetch("http://localhost:4000/pic", {
        method: "GET",
      });
      console.log(response);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Adjust loading time as needed
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Button clicked!");
  };

  const onClose = () => {
    setShowProfileForm(false);
  };

  const [showProfileForm, setShowProfileForm] = useState(false);

  return (
    <div className="rounded d-flex flex-column justify-content-center">
      {isLoading ? (
          <div class="image-overlay1">
          <div class="mx-auto profile-grid d-flex flex-column cointainer-skelton">
            <div className="container1">
              <h1 className="fname">
                <div className="fname mb-4">---------------- </div>
                <div className="fname mb-4"> ---------</div>
              </h1>
              <br />
              <h3><div className="email-skelton">. </div></h3>
              <h3><div className="email-skelton">. </div></h3>
            </div>
            <div class="container2">
              <button className="button-skelton">
                
              </button>
              <button className="button-skelton">
                
              </button>
              <button class="edit-skelton">
                
              </button>
            </div>
          </div>
        </div>
        
      ) : (
        <div className="bg-image1 rounded d-flex flex-column justify-content-center">
        <div className="image-overlay">
          <div className="mx-auto profile-grid d-flex flex-column">
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
              </button>
              <button className="image-grid">
                No. of Images :- {profileData.images}
              </button>
              <button
                className="edit-grid"
                onClick={() => setShowProfileForm(true)}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
      {showProfileForm && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <ProfileForm onClose={onClose} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default Profile;

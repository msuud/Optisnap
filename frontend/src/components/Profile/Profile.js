import React, { useState, useEffect, useContext } from "react";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

const Profile = () => {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("hello");
  //     const response = await fetch("http://localhost:4000/pic", {
  //       method: "GET",
  //     });
  //     console.log(response);

  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   };

  //   fetchData();
  // }, []);

  const onClose = () => {
    setShowProfileForm(false);
    window.location.reload();
  };

  const [showProfileForm, setShowProfileForm] = useState(false);
  const { user } = useContext(UserContext);

  return (
    <div className="rounded d-flex flex-column justify-content-center">
      <div className="bg-image1 rounded d-flex flex-column justify-content-center">
        <div className="image-overlay">
          <div className="mx-auto profile-grid d-flex flex-column">
            <div className="container1">
              <h1 className="h1">
                {user.firstName}
                <br></br>
                {user.lastName}
              </h1>
              <br></br>
              <h3>Email :- {user.email}</h3>
              <h3>Username :- {user.username}</h3>
            </div>

            <div className="container2">
              <button className="workspace-grid">
                No. of Workspaces :- {user.WScount}
              </button>
              <button className="image-grid">
                No. of Images :- {user.img_count}
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

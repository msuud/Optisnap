import React from 'react';
import './Profile.css';

const Profile = ({ name, email, username, numWorkspaces, numImages }) => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="bg-image rounded d-flex flex-column align-items-center justify-content-center">
      <div className="image-overlay">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
        <div>
      <h1>Profile</h1>
      <div>
        <strong>Name:</strong> {name}
      </div>
      <div>
        <strong>Email:</strong> {email}
      </div>
      <div>
        <strong>Username:</strong> {username}
      </div>
      <div>
        <strong>Number of Workspaces:</strong> {numWorkspaces}
      </div>
      <div>
        <strong>Number of Images:</strong> {numImages}
      </div>
      <button onClick={handleClick}>Edit Profile</button>
    </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
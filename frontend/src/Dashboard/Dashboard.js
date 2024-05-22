import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container-fluid bg-image d-flex flex-column align-items-center justify-content-center">
      <div className="container rounded text-black text-center p-5 mt-4">
        <h1>Welcome Back!!</h1>
        <div className="row row1 justify-content-center">
          <div class="col mt-3">
            <div class="rounded text-white text-center mt-3 p-1 small-grid-bg">
              <p className="workspace">My workspaces - 1</p>
            </div>
          </div>
          <div class="col mt-3">
            <div class="rounded text-white text-center mt-3 p-1 small-grid-bg">
              <p className="image">My images - 5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
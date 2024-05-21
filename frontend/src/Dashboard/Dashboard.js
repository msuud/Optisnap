import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container-fluid bg-image">
      <div className="container rounded text-black text-center p-5 mt-4 ml-4 mr-4 grid-bg">
        <h1>Welcome Back!!</h1>
        <div className="row row1">
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

export default Dashboard;

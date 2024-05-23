import React from "react";
import "./Dashboard.css";
import Table from "../Table/Table";

const Dashboard = () => {
  return (
    <div className="bg-image rounded d-flex flex-column align-items-center justify-content-center">
      <div className="image-overlay">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <h1 className="animated-text">Welcome Back!!</h1>
          <div className="row row1 justify-content-center box2">
            <div class="col mt-3 workspace1">
              <div class="rounded text-white text-center mt-3 p-1 small-grid-bg">
                <p className="workspace mb-0">My workspaces - 1</p>
              </div>
            </div>
            <div class="col mt-3 image1">
              <div class="rounded text-white text-center mt-3 p-1 small-grid-bg">
                <p className="image mb-0">My images - 5</p>
              </div>
            </div>
          </div>
        </div>
        <h3>Uploaded Images</h3>
        <div className="grid2 text-gray">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
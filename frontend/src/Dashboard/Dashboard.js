import React from "react";
import "./Dashboard.css";
import img1 from "../assets/bg-login3.jpg";

const Dashboard = () => {
  return (
    <div className="container-fluid bg-image d-flex flex-column align-items-center justify-content-center">
      <div className=" rounded text-black text-center p-5 mt-4">
        <h1>Welcome Back!!</h1>
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

      <h2
        class="heading flex items-left items-baseline justify-between space-x-2"
        style={{ textAlign: "left" }}
      >
        <div>
          <span class="font-hero">Aggregated metrics</span>{" "}
        </div>
      </h2>
      <div className="images container rounded text-black text-center mt-3 p-3 ">
        <a href={img1} target="_blank">
          <img src={img1}></img>
        </a>
        <h4>Image 1</h4>
      </div>
      <div className="images container rounded text-black text-center mt-3 p-3 ">
        <a href={img1} target="_blank">
          <img src={img1}></img>
        </a>
        <h4>Image 2</h4>
      </div>
      <div className="images container rounded text-black text-center mt-3 p-3 ">
        <a href={img1} target="_blank">
          <img src={img1}></img>
        </a>
        <h4>Image 3</h4>
      </div>
    </div>
  );
};

export default Dashboard;

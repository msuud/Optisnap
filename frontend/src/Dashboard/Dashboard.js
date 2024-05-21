import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="container-fluid bg-image">
      <div className="relative rounded-3xl bg-gradient-to-r from-deep-purple-700 to-deep-purple-300 p-10 2xl:-mx-10 pt-10">
        <div className="flex items-center space-x-3">
          <h1 className="font-hero text-3xl leading-none text-white">
            "Welcome Back "<span class="text-green-day-500">Urva Dave</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

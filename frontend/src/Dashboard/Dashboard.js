import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Table from "../Table/Table";
import { useEffect } from "react";
import axios from "axios";
import {AuthContext} from "../Contexts/AuthContext";
const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState({
    username: "",
    noOfWS: 0,
    noOfImg: 0,
  });
  const [tableData, setTableData] = useState({
    uploadedImages: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/pic/dashboard",
          { withCredentials: true }
        );
        // console.log(response);
        setDashboardData({
          username: response.data.username,
          noOfWS: response.data.noOfWS,
          noOfImg: response.data.noOfImg,
        });
        setTableData({
          uploadedImages: response.data.recent_10,
        });
      } catch (error) {
        console.log(error.response.status === 401);
        if (error.response.status === 401) {
          navigate("/")
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-image rounded d-flex flex-column align-items-center justify-content-center">
      <div className="image-overlay">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <h1 className="animated-text">
            Welcome Back {dashboardData.username}!!
          </h1>
          <div className="row row1 justify-content-center box2">
            <div className="col mt-3 workspace1">
              <div className="rounded text-white text-center mt-3 p-1 small-grid-bg">
                <p className="workspace mb-0">
                  My workspaces - {dashboardData.noOfWS}
                </p>
              </div>
            </div>
            <div className="col mt-3 image1">
              <div className="rounded text-white text-center mt-3 p-1 small-grid-bg">
                <p className="image mb-0">
                  My images - {dashboardData.noOfImg}
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3>Uploaded Images</h3>
        <div className="grid2 text-gray">
          {/* <Table /> */}
          <Table tableData={tableData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

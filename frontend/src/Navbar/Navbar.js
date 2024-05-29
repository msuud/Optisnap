import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/logo1.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="nav-icon" />,
  },
  {
    name: "Workspace",
    path: "/workspace",
    icon: <BadgeIcon className="nav-icon" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <PersonIcon className="nav-icon" />,
  },
  {
    name: "About Us",
    path: "/about-us",
    icon: <InfoIcon className="nav-icon" />,
  },
];

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();
  const handleActualLogout = async () => {
    if (window.confirm("Do you want to logout?")) {
      const response = await axios.post("http://localhost:4000/logout", "", {
        withCredentials: true,
      });
      console.log(response);
      handleLogout();
      navigate("/login");
    }
  };
  return (
    <nav className="vertical-navbar">
      <div className="company-logo">
        <img src={logo} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      <ul>
        {navigationItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} activeclassname="active">
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
        <li className="logout-button">
          <a href="#">
            <LogoutIcon />
            <button onClick={handleActualLogout} className="Navbar-button">
              Logout
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

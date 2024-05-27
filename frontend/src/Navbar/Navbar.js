import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import HomeIcon from "@mui/icons-material/Home";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import logo from "../assets/logo.jpg";

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

const Navbar = () => {
  return (
    <nav className="vertical-navbar">
      <div className="company-logo">
        <img src={logo} alt="OptiSnap Logo" className="logo-image" />
        OptiSnap
      </div>
      <ul>
        {navigationItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path}>
              {item.icon}
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Navbar from "./Navbar/Navbar";
import Aboutus from "./About-us/aboutus";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/about-us" element={<Aboutus />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

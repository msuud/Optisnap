import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import "./Workspace.css";
import db from "./db.json"
import WorkspaceDetails from './WorkspaceDetails';
import { useNavigate } from 'react-router-dom';
import PopupForm from '../PopupForm';

const WorkspaceUser = () => {

  const [data, setData, setIsLoggedIn] = useState([])
  const [showModel, setShowModel]=useState(false);
  const navigate=useNavigate();

  const getData = () => {
    fetch('db.json', { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } })
      .then((response) => response.json())
      .then((myjson) => setData(myjson))
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const client = localStorage.getItem("client");
    if (client) {
      setIsLoggedIn(true);
    }
  }, []);
  
  const onClose=()=>{
    setShowModel(false);
  }
  const handleWorkspaceClick = (title) => {
    console.log('Clicked workspace:', title);
  };

  const handleworkspace=()=>{
    setShowModel(false);
    navigate("/workspace-user");
}

  return (
    <div className="bg-image rounded box4 justify-content-center">
      {console.log("Data in App:", data)}
      <div className="cointainer">
      <h1 className="heading1">Your Workspaces</h1>
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <div className="app1" >
            {
              db && db.length > 0 && db.map((val) => {
                return (
                  <Link key={val.id} to={`/${val.title}`} className="workspace-box" onClick={() => handleWorkspaceClick(val.title)} >
                    <h2>{val.title}</h2>
                    <h4 className='mt-5'>Images: {val.images}</h4>
                  </Link>
                )
              })
            }
            <div className="workspace-box create-workspace" onClick={()=> setShowModel(true)}>
                    <div className='mx-2'><h2>+<br/></h2></div>
                    <br />
                   <div> <h3>create workspace</h3></div>
                  </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <PopupForm onClose={onClose} handleworkspace={handleworkspace}/>
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  )
}

export default WorkspaceUser

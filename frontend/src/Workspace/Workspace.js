import React from "react";
import "./Workspace.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PopupForm from "../PopupForm";

const Workspace = () => {
  const [showModel, setShowModel]=useState(false);

  const navigate=useNavigate();
  const onClose=()=>{
    setShowModel(false);
  }
//   const handleworkspace=()=>{
//     setShowModel(false);
//     navigate("/workspace-user");
// }

  return (
    <div className="bg-image rounded d-flex flex-column align-items-center justify-content-center">
        <div className="box3">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
        <p className="workspace"></p>
              <h1>No<br />Workspace<br />Yet!</h1>
          <div class="col mt-6">
            <div class=" text-white text-center mt-3 p-2">
              <button onClick={()=> setShowModel(true)} className="button-create small-grid-bg">Create your Workspace</button>
        </div>
        </div>
        </div>
      </div>
      {showModel && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <PopupForm onClose={onClose} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default Workspace;
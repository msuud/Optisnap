import React from "react";
import "./workspace.css";

const workspace = () => {
  const handleClick =()=>{
    console.log("buttonclicked");
  }
  const handleworkspace=()=>{

prompt("Name your Workspace")  }
  return (
    <div className="bg-image rounded d-flex flex-column align-items-center justify-content-center">
      <div className="image-overlay">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
        <p className="workspace"></p>
              <h1>No<br />Workspace<br />Yet!</h1>
          <div class="col mt-6">
            <div class=" text-white text-center mt-3 p-2 "onClick={handleClick}>
             <button onClick={handleworkspace}>Create your Workspace</button>


        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default workspace;
import React from "react";
import "./workspace.css";

const workspace = () => {
  const handleClick =()=>{
    console.log("buttonclicked");
  }
  return (
    <div className="container-fluid bg-image">
      <div className="container rounded text-black text-center p-4 mt-4 ml-4 mr-4 grid-bg">
        
        <div className="col col1">
          <div class="col1 mt-1">
          <div class="rounded text-black text-center mt-1  p-1">
              <p className="workspace"></p>
              
              <h1>No Workspace Yet!</h1>
             
            </div>
          </div>
          <div class="col mt-6">
            <div class=" text-white text-center mt-3 p-2 small-grid-bg"onClick={handleClick}>
            
              {/* { <p className="image"></p> */}
              {/* { <button type="button">Create your Workspace</button> */}
              Create your Workspace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default workspace;
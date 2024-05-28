import React from 'react'

const WorkspaceDetails = ({ title }) => {
    console.log('Displaying workspace details:', title);
  
    return (
      <div>
        <h2>Workspace Details: {title}</h2>
      </div>
    );
  };
  
  export default WorkspaceDetails;
  
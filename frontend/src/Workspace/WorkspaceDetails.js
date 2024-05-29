import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './WorkspaceDetails.css'
import TableWorkspace from "../Table/TableWorkspace";


const WorkspaceDetails = ({ data }) => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    if (data) {
      const foundWorkspace = data.find((item) => parseInt(id) === item.id); 
      setWorkspace(foundWorkspace);
    }
  }, [data, id]);

  if (!workspace) {
    return <div>Workspace not found!</div>; 
  }

  return (
    <div className="bg-image1 rounded d-flex flex-column ">
        <div className="grid1w rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
      <h1 className="workspace-heading">Workspace Details</h1>
      <div className="cointainer-workspace mt-4">
      <h2 className="">Workspace Name: {workspace.title}</h2>
      <h2 className="">Images: {workspace.images}</h2>
      <div className="d-flex justify-content-center mt-5">
      <div className="Table-workspace">
        <TableWorkspace />
      </div>
      </div>
      </div>
      </div>
    </div>
  );
};

export default WorkspaceDetails;

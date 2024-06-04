import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./WorkspaceDetails.css";
import "./Workspace.css";
import TableWorkspace from "../Table/TableWorkspace";
import UploadImage from "./UploadImage";
import axios from "axios";

const WorkspaceDetails = () => {
  const [workspace, setWorkspace] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { WSname } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/pic/workspace/${WSname}`,
          {
            withCredentials: true,
          }
        );
        setWorkspace(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const onClose = () => {
    setShowForm(false);
  };

  if (!workspace) {
    return <div>Workspace not found!</div>;
  }

  return (
    <div className="bg-image1 rounded d-flex flex-column ">
      <div className="grid1w rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
        <h1 className="workspace-heading">Workspace Details</h1>
        <div className="cointainer-workspace mt-4">
          <h2 className="">Workspace Name : {workspace.name}</h2>
          <h2 className="">Images : {workspace?.images?.length || 0}</h2>
          <div className="d-flex justify-content-center mt-4">
            <div className="Table-workspace">
              <div className="d-flex justify-content-start my-2 mx-3 upload-button">
                <button
                  className="text-start"
                  onClick={() => setShowForm(true)}
                >
                  Upload Image
                </button>
              </div>
              {!workspace.images.length ? (
                <h3>No uploaded images !</h3>
              ) : (
                <>
                  <TableWorkspace workspace={workspace} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showForm && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <UploadImage onClose={onClose} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceDetails;

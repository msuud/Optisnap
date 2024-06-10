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
  const [isLoading, setIsLoading] = useState(true);
  const { WSname } = useParams();
  const [images, setImages] = useState([]);

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
        setImages(response.data.data.images);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 0);
      }
    };
    fetchData();
  }, [WSname]);

  const onClose = () => {
    setShowForm(false);
  };

  const removeImage = (imageName) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  const addImage = (newImage) => {
    setImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <div className="bg-image1 rounded d-flex flex-column ">
      <div className="grid1w rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
        <h1 className="workspace-heading">Workspace Details</h1>
        <div className="cointainer-workspace mt-4">
          {isLoading ? (
            <>
              <h2 className="skeleton details-skeleton">Workspace Name:</h2>
              <h2 className="skeleton details-skeleton width-small mt-3">
                Images:
              </h2>
              <div className="">
                <div className="d-flex justify-content-center mt-4">
                  <div className="Table-workspace">
                    <div className="">
                      <div className="skeleton width-verysmall">
                        Upload Image
                      </div>
                      <div className="skeleton1 mt-2">
                        <div className="skeleton details-skeleton width-large">
                          Table data1
                        </div>
                        <div className="skeleton details-skeleton width-large">
                          Table data2
                        </div>
                        <div className="skeleton details-skeleton width-large">
                          Table data3
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {!workspace && <div>Workspace not found!</div>}
              {workspace && (
                <>
                  <h2 className="">Workspace Name : {workspace.name}</h2>
                  <h2 className="">Images : {images.length || 0}</h2>
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
                      {!images.length ? (
                        <h3>No uploaded images!</h3>
                      ) : (
                        <TableWorkspace
                          workspace={{ ...workspace, images }}
                          removeImage={removeImage}
                        />
                      )}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {showForm && (
        <div className="popup-modal">
          <div className="popup-form-container">
            <UploadImage onClose={onClose} addImage={addImage} />
          </div>
          <div className="popup-backdrop" onClick={onClose} />
        </div>
      )}
    </div>
  );
};

export default WorkspaceDetails;

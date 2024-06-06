import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/esm/CloseButton";
import { useNavigate } from "react-router-dom";
import "./UploadImage.css";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const UploadImage = ({ onClose, handleworkspace }) => {
  const navigate = useNavigate();
  const { WSname } = useParams();

  const handleworkspace1 = async () => {
    const formData = new FormData();
    const imageInput = document.querySelector('input[type="file"]');
    formData.append("image", imageInput.files[0]);
    formData.append("WSname", WSname);
    try {
      toast.info("Image is being uploaded!");
      const response = await axios.post(
        "http://localhost:4000/pic/addPic",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success === true) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <h4>Upload image</h4>
          </Modal.Title>
          <button onClick={onClose} className="Button-form">
            <CloseButton />
          </button>
        </Modal.Header>

        <Modal.Body>
          <form>
            <input type="file" accept="image/*" />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button type="submit" onClick={handleworkspace1}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
      <ToastContainer/>
    </div>
  );
};

export default UploadImage;

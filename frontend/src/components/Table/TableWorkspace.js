import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BasicTable({ workspace, removeImage }) {
  const { WSname } = useParams();

  const handleDelete = async (row) => {
    try {
      const imageName = row.name;
      if (window.confirm("Do you want to delete the image?")) {
        toast.info("Image deleted!");
        const response = await axios.delete(
          `http://localhost:4000/pic/delPic/${WSname}/${imageName}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success === true) {
          removeImage(imageName);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  let rows = workspace.images;
  return (
    <div className="table">
      <TableContainer
        component={Paper}
        style={{
          boxShadow: "50px 50px 60px 20px #80808029",
          borderRadius: "20px",
          width: "1000px",
          alignSelf: "center",
          maxHeight: "300px"
        }}
      >
        <Table
          sx={{ tableLayout: "fixed", borderRadius: "20px" }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  fontSize: "20px",
                  color: "green",
                  width: "20px",
                }}
              ></TableCell>
              <TableCell
                align="center"
                style={{
                  fontSize: "20px",
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                Image
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "20px", color: "green", fontWeight: "bold" }}
              >
                Size
              </TableCell>
              <TableCell
                align="center"
                style={{ fontSize: "20px", color: "green", fontWeight: "bold" }}
              >
                Upload Date
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    <button
                      className="three-button"
                      onClick={() => handleDelete(row)}
                      style={{
                        border: "1px solid black",
                        borderRadius: "20px",
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ fontSize: "17px" }}
                  >
                    <a href={`http://localhost:4000/load/${row.name}`} target="_blank" rel="noopener noreferrer">
                      {row.name}
                    </a>
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ fontSize: "17px" }}
                  >
                    {row.size}
                    {" MB"}
                  </TableCell>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    style={{ fontSize: "17px" }}
                  >
                    {moment(row.uploadedAt).format("MM-DD-YYYY")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
}

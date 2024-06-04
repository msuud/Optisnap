import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BasicTable({ workspace }) {
  const { WSname } = useParams();
  const handleDelete = async (row) => {
    try {
      const imageName = row.name;
      console.log(imageName);
      if (window.confirm("Do you want to delete the image ?")) {
        const response = await axios.delete(
          `http://localhost:4000/pic/delPic/${WSname}/${imageName}`,
          {
            withCredentials: true,
          }
        );
        if (response.data.success === true) {
          window.location.reload();
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
              {/* <TableCell align="left">Name</TableCell>
              <TableCell align="left">URL</TableCell> */}
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
                      style={{ paddingLeft: "50px" }}
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
                    {row.name}
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
    </div>
  );
}

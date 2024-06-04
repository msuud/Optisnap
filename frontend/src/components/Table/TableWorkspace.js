import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(image, size, Uploaddate) {
  return { image, size, Uploaddate };
}

const rows = [
  createData("image 1", "450MB", "21 December 2023", "20 March 2024"),
  createData("image 2", "700MB", "2 December 2023", "22 December 2023"),
  createData("image 3", "1GB", "3 January 2023", "2 February 2024"),
  createData("image 4", "210MB", "22 May 2023", "4 January 2023"),
];

export default function BasicTable() {
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
                style={{ fontSize: "20px", color: "green", fontWeight: "bold" }}
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ fontSize: "17px" }}
                >
                  {row.image}
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ fontSize: "17px" }}
                >
                  {row.size}
                </TableCell>
                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  style={{ fontSize: "17px" }}
                >
                  {row.Uploaddate}
                </TableCell>
                {/* <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.link}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

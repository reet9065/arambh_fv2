import React, { useState } from "react";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SclassAddEditFormDialog from "./form/SclassAddEditFormDialog";
import useDialogFormControler from "../../../hooks/useDialogFormControler";

function Sclass() {
  const [open, setOpen] = useState(false);

  const {formOpen, handleFormClose, handleFormOpen} = useDialogFormControler();

  return (
    <Stack
      direction={"column"}
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "80%", xl: "80%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="center"> Class</TableCell>
              <TableCell align="center">Class code</TableCell>
              <TableCell align="center">edit</TableCell>
              <TableCell align="center">delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <React.Fragment>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell align="center">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                  >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </TableCell>

                <TableCell component="th" scope="row" align="center">
                  NC
                </TableCell>

                <TableCell align="center">NCA</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
                  colSpan={6}
                >
                  <Collapse
                    in={open}
                    timeout="auto"
                    unmountOnExit
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                    <Chip
                      label="English | ENG"
                      size="small"
                      sx={{ my: 0.5, mx: 1 }}
                    />
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: "16px" }}
        endIcon={<AddIcon />}
        onClick={() =>
          handleFormOpen({
            type: "Add",
          })
        }
      >
        Add Class
      </Button>

      {formOpen && (
        <SclassAddEditFormDialog
          formValue={formOpen}
          handleClose={handleFormClose}
        />
      )}
    </Stack>
  );
}

export default Sclass;

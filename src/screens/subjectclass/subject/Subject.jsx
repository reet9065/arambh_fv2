import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import SubjectAddEditFormDialoag from "./form/SubjectAddEditFormDialoag";
import { SubjectListContext } from "../Index";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { getSubjects, deleteSubject } from "../../../GQL/keysAndQueries";
import useDialogFormControler from "../../../hooks/useDialogFormControler";
import useSubjectDelete from "./hooks/useSubjectDelete";
import Fab from "@mui/material/Fab";

function Subject() {
  console.log("subject page renderd");
  const subjectList = useContext(SubjectListContext);
  const { deleteOneSubject, isLoading } = useSubjectDelete();

  const { formOpen, handleFormClose, handleFormOpen } = useDialogFormControler();


  const deleteSubjectFromList = async (id) => {
    if (!id) {
      return;
    }

    var userConformation = window.confirm(
      "Are you sure want to delete this Subject"
    );

    if (!userConformation) {
      return;
    }

    await deleteOneSubject(deleteSubject.query(id));
  };

  return (
    <Stack
      direction={"column"}
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%", lg: "80%", xl: "80%" },
        display: "flex",
        alignItems: "center",
        height:"100%"
      }}
    >
      {subjectList.isLoading && isLoading && <CircularProgress />}
      {subjectList.error && (
        <Typography variant="body2" color="error" align="center">
          {subjectList.error.message}
        </Typography>
      )}

      {formOpen && (
        <SubjectAddEditFormDialoag
          formValue={formOpen}
          handleClose={handleFormClose}
        />
      )}

      {!subjectList.error && subjectList.data && (
        <TableContainer component={Box}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Subject</TableCell>
                <TableCell align="center">Subject Code</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjectList.data[getSubjects.key].length > 0 &&
                subjectList.data[getSubjects.key].map((subject, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{subject.subName}</TableCell>
                      <TableCell align="center">{subject.subCode}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            handleFormOpen({
                              type: "Update",
                              data: {
                                id: subject.id,
                                subName: subject.subName,
                                subCode: subject.subCode,
                              },
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => deleteSubjectFromList(subject.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Fab
        color="primary"
        variant="extended"
        onClick={() =>
          handleFormOpen({
            type: "Add",
          })
        }
      >
        Add Subject{" "}
        <AddIcon sx={{ mr: 1 }} />
      </Fab>
      {/* <Button
        variant="contained"
        color="primary"
        sx={{ mt: "16px" }}
        endIcon={<AddIcon />}

      >
        Add Subject
      </Button> */}
    </Stack>
  );
}

export default Subject;

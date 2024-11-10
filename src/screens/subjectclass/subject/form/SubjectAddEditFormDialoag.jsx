import React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import useSubjectMutation from "../hooks/useSubjectMutation";
import { createSubject, updateSubject } from "../../../../GQL/keysAndQueries";

function SubjectAddEditFormDialoag({ formValue, handleClose }) {
  const open = Boolean(formValue);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formValue.data ? formValue.data : {},
  });

  const onOperationSuccess = () => {
    reset();
    handleClose();
  };

  const { createNewSubject, updateASubject } = useSubjectMutation({
    onOperationSuccess,
  });

  console.log(errors);

  const checkForDilogClose = () => {
    if (!isSubmitting) {
      reset();
      handleClose();
    }
  };

  const onformSubmit = (data) => {
    if (formValue.type === "Add") {
      createNewSubject(createSubject.query(data));
    }

    if (formValue.type === "Update") {
      updateASubject(updateSubject.query(formValue.data.id, data));
    }
  };

  return (
    <Dialog open={open} onClose={checkForDilogClose}>
      <form onSubmit={handleSubmit(onformSubmit)} style={{ width: "100%" }}>
        <DialogTitle>{`${formValue.type} Subject`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            disabled={isSubmitting}
            {...register("subName", {
              required: "Subject name is required",
              minLength: {
                value: 2,
                message: `Subject name should have atlist 2 charecters`,
              },
            })}
            margin="dense"
            label="Subject"
            type="text"
            variant="filled"
            fullWidth
            size="small"
            error={Boolean(errors.subName)}
            helperText={errors.subName ? errors.subName.message : undefined}
          />
          <TextField
            autoFocus
            disabled={isSubmitting}
            {...register("subCode", {
              required: "Subject Code is required",
            })}
            margin="dense"
            label="Subject code"
            type="text"
            fullWidth
            variant="filled"
            size="small"
            error={Boolean(errors.subCode)}
            helperText={errors.subCode ? errors.subCode.message : undefined}
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={checkForDilogClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <LoadingButton loading={isSubmitting} type="submit">
            {formValue.type}
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default SubjectAddEditFormDialoag;

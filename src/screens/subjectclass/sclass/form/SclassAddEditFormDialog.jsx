import React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function SclassAddEditFormDialog({ formValue, handleClose }) {
  const open = Boolean(formValue);

  const subjectList = ["1", "2", "3", "4"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: formValue.data ? formValue.data : {},
  });

  console.log(errors);

  const checkForDilogClose = () => {
    if (!isSubmitting) {
      reset();
      handleClose();
    }
  };

  const onformSubmit = async (data) => {
    console.log("formsubmitted");
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating async operation
    console.log(data);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={checkForDilogClose}>
      <form onSubmit={handleSubmit(onformSubmit)} style={{ width: "100%" }}>
        <DialogTitle>{`${formValue.type} Class`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            disabled={isSubmitting}
            {...register("sclass", {
              required: "Class is required",
            })}
            margin="dense"
            label="Class"
            type="text"
            variant="filled"
            fullWidth
            size="small"
            error={Boolean(errors.sclass)}
            helperText={errors.sclass ? errors.sclass.message : undefined}
          />
          <TextField
            autoFocus
            disabled={isSubmitting}
            {...register("sclassCode", {
              required: "Subject Code is required",
            })}
            margin="dense"
            label="Subject code"
            type="text"
            fullWidth
            variant="filled"
            size="small"
            error={Boolean(errors.sclassCode)}
            helperText={
              errors.sclassCode ? errors.sclassCode.message : undefined
            }
            inputProps={{ style: { textTransform: "uppercase" } }}
          />
          <Typography variant="body1" sx={{ mt: 1 }}>
            Choose subject
          </Typography>
          <hr />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              mt: 1,
            }}
          >
            {subjectList.map((subject, i) => {
              return (
                <Stack
                  key={i}
                  direction={"row"}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Checkbox {...register("sclassSubjects")} value={subject}/>
                  <Typography variant="body2">
                    English <span style={{ color: "blue" }}>(ENG)</span>
                  </Typography>
                </Stack>
              );
            })}
          </Box>
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

export default SclassAddEditFormDialog;

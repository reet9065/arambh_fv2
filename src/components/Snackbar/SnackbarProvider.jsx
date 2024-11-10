import React, { createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export const SnackbarContext = createContext();

function SnackbarProvider({ children }) {

  const [open, setOpen] = useState(null);

  const handleClick = (snackbarObject) => {
    setOpen(snackbarObject);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(null);
  };

  
  return (
    <>
      <SnackbarContext.Provider value={{handleClick}}>
        {children}
        {open && <Snackbar open={Boolean(open)} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={open.type}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {open.message}
          </Alert>
        </Snackbar>}
      </SnackbarContext.Provider>
    </>
  );
}

export default SnackbarProvider;

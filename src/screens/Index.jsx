import React from "react";
import { Outlet } from "react-router-dom";
import SnackbarProvider from "../components/Snackbar/SnackbarProvider";

function Index() {
  return (
    <>
      <SnackbarProvider>
        <Outlet />
      </SnackbarProvider>
    </>
  );
}

export default Index;

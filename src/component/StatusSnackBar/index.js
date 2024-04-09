import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const StatusSnackBar = ({ error, success }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error || success) setOpen(true);
  }, [error, success]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        {success ? (
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {success}
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="warning"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        )}
      </Snackbar>
    </div>
  );
};

export default StatusSnackBar;

import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface ErrorAlertProps {
  error: string | null;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <Snackbar open={!!error} autoHideDuration={2000}>
      <Alert severity="error">{error}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;

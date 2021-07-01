import React, { useContext, SyntheticEvent } from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";

import { SnackbarContext } from "./SnackbarProvider";
import { SNACKBAR_DURARION } from "../../constants";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const Snackbar = () => {
  const classes = useStyles();

  const { snackbar, setSnackbar } = useContext(SnackbarContext);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar(false);
  };

  return snackbar ? (
    <div className={classes.root}>
      <MuiSnackbar
        open={true}
        autoHideDuration={SNACKBAR_DURARION}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbar.type}>
          {snackbar.message}
        </Alert>
      </MuiSnackbar>
    </div>
  ) : null;
};

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

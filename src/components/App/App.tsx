import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { MapContainer } from "../Map";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { LocationPicker } from "../Map";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
  })
);

export const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar />

      <Header />

      <MapContainer>
        <LocationPicker />
      </MapContainer>
    </div>
  );
};

import React, { useState, Context, createContext } from "react";

import { Snackbar } from "./Snackbar";

interface ISnackbar {
  type: "error" | "warning" | "success" | "info";
  message: string;
}

export type State = boolean | ISnackbar;

export const SnackbarContext: Context<any> = createContext({
  snackbar: {},
  setSnackbar: () => {},
});

interface Props {
  children: JSX.Element[];
}

export const SnackbarProvider = (props: Props) => {
  const { children } = props;

  const [snackbar, setSnackbar] = useState<State>(false);

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      <Snackbar />

      {children}
    </SnackbarContext.Provider>
  );
};

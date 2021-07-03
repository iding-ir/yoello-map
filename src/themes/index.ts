import { createMuiTheme, ThemeOptions } from "@material-ui/core";
import { blue, yellow, grey } from "@material-ui/core/colors";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      light: blue[500],
      main: blue[700],
      dark: blue[900],
      contrastText: grey[50],
    },
    secondary: {
      light: yellow[500],
      main: yellow[700],
      dark: yellow[900],
      contrastText: grey[900],
    },
  },
};

export const theme = createMuiTheme(themeOptions);

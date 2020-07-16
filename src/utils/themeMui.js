import { createMuiTheme } from "@material-ui/core";
import { indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: indigo.A100,
      light: indigo[50],
      dark: indigo[500],
    },
    primary: {
      main: "#460151",
      light: "#42e8dc",
      dark: "#380250",
      white: '#D4D4D4'
    },
  },
  typography: {
    body1: {
      fontWeight: 500,
    },
  },
  overrides: {
    MuiContainer: {
      maxWidthXl: {
        paddingTop: "1vh",
        paddingLeft: "5vw",
        paddingRight: "5vW",
        paddingBottom: "5vW",
      },
    },
    MuiTypography: {
      colorTextSecondary: "#2196f3",
    },
  },
  spacing: (value) => value ** 2,
});

export default theme;

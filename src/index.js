import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { indigo } from "@material-ui/core/colors";

import { SnackbarProvider } from "notistack";

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
  },
  spacing: (value) => value ** 2,
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <App />
    </SnackbarProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

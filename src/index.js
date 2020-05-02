import React from "react";
import ReactDOM from "react-dom";
//import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { indigo } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: indigo.A100,
      light: indigo[50],
      dark: indigo[500],
    },
  },
  spacing: value => value ** 2
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

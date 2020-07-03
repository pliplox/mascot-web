import React from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./themeMui";
import mediaQuery from "css-mediaquery";

export const renderWithProvider = ({ ...children }) => {
  return render(
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <AuthProvider>{children}</AuthProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

// ------------------------
// ---- Media Query -------

// Simulate different screen widths to work with material-ui

const createMatchMedia = (width) => (query) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => {},
  removeListener: () => {},
});

export const setWindowWidth = (width) => {
  global.window.matchMedia = createMatchMedia(width);
};


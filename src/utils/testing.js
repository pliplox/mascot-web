import React from "react";
import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./themeMui";

export const renderWithProvider = ({ ...children }) => {  
  return render(
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>{children}</SnackbarProvider>
    </MuiThemeProvider>
  );
};

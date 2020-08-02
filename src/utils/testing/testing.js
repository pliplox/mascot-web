import React, { Suspense } from "react";
import { render } from "@testing-library/react";
import { AuthProvider } from "../../context/AuthContext";
import { SnackbarProvider } from "notistack";
import { MuiThemeProvider } from "@material-ui/core";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import theme from "../themeMui";
import mediaQuery from "css-mediaquery";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18nForTests';

export const renderWithProvider = ({ ...children }) => {
  return render(
    <MuiThemeProvider theme={theme}>
      <I18nextProvider i18n={i18n}>
        <Suspense fallback={<div>Loading...</div>}>
          <SnackbarProvider>
            <AuthProvider>{children}</AuthProvider>
          </SnackbarProvider>
        </Suspense>
      </I18nextProvider>
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

const rand = () => {
  return Math.random().toString(36).substr(2); // remove `0.`
};

export const tokenMock = () => rand() + rand();

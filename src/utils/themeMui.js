import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#41005f',
      dark: '#380250',
      white: '#D4D4D4'
    },
    secondary: {
      main: '#00e7ee'
    }
  },
  typography: {
    fontFamily: ['PetitaMedium', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    fontWeight: 500
  },
  overrides: {
    MuiContainer: {
      maxWidthXl: {
        paddingTop: '1vh',
        paddingLeft: '5vw',
        paddingRight: '5vW',
        paddingBottom: '5vW'
      }
    },
    MuiTypography: { colorTextSecondary: '#2196f3' },
    MuiDialog: {
      paper: { fontFamily: ['PetitaLight, Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(',') }
    }
  },
  spacing: value => value ** 2
});

export default theme;

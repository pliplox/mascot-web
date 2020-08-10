import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import theme from './utils/themeMui';
import { Navbar } from './components/shared/navbar';
import Fed from './pages/fed/Fed';
import Group from './pages/familyGroup/Group';
import Pet from './pages/pet/Pet';
import { SignIn, SignUp } from './pages/auth';
import PrivateRoute from './components/private-route';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const tokenId = localStorage.getItem('tokenId');
  return (
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
      >
        <BrowserRouter>
          <AuthProvider>
            <Navbar>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() =>
                    tokenId ? <Redirect to="/alimentar" /> : <Redirect to="/signin" />
                  }
                />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />

                {/* Private routes */}
                <PrivateRoute path="/alimentar" component={Fed} />
                <PrivateRoute path="/grupos" component={Group} />
                <PrivateRoute te path="/mascotas" component={Pet} />
                {/* End of private routes */}

                <Route path="*" component={() => '404 Not found'} />
              </Switch>
            </Navbar>
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Navbar } from "./components/shared/navbar";
import Fed from "./pages/fed/Fed";
import Group from "./pages/familyGroup/Group";
import Pet from "./pages/pet/Pet";
import { SignIn, SignUp } from './pages/auth';
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const getToken = localStorage.getItem("tokenId");
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return getToken ? (
                  <Redirect to="/alimentar" />
                ) : (
                  <Redirect to="/signin" />
                );
              }}
            />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route
              path="/signup"
              render={() => {
                return getToken ? <Redirect to="/alimentar" /> : <Redirect to="/signup" />;
              }}
            />
            <PrivateRoute path="/alimentar">
              <Fed />
            </PrivateRoute>
            <PrivateRoute path="/grupos">
              <Group />
            </PrivateRoute>
            <PrivateRoute path="/mascotas">
              <Pet />
            </PrivateRoute>

            <Route path="*" component={() => "404 Not found"} />
          </Switch>
        </Navbar>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import { Navbar } from "./components/shared/navbar";
import SignIn from "./pages/auth/SignIn";
import PrivateRoute from "./components/private-route";
import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar>
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <PrivateRoute path="/">
              <div>Hello</div>
            </PrivateRoute>
          </Switch>
        </Navbar>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

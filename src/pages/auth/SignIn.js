import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const history = useHistory();
  const location = useLocation();
  const { signIn } = useAuth();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = () => {
    signIn("email@pliplox.cl", "1234");
    history.replace(from);
  };

  return (
    <form onSubmit={handleSignIn}>
      <p>Mail:</p>
      <input type="text" placeholder="example@example.com" />
      <p>Password:</p>
      <input type="password" placeholder="***********" />
      <button type="submit">Entrar</button>
      <br />
      <br />
      <Link to="/signup">Registrate aquí!</Link>
    </form>
  );
};

export default SignIn;

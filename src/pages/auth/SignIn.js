import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignInForm } from '../../components/signin-form';

const SignIn = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { signIn, authError } = useAuth();

  const handleSignIn = async (email, password) => {
    try {
      const response = signIn(email, password);
      if (response?.status === 200) {
        history.replace(from);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return <SignInForm onSubmit={handleSignIn} error={authError} />;
};

export default SignIn;

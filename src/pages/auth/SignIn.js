import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SignInForm } from '../../components/auth/signin-form';
import isSignedIn from '../../utils/isSignedIn';

const SignIn = () => {
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };
  const { signIn, authError } = useAuth();

  useEffect(() => {
    if (isSignedIn()) history.push('/alimentar');
  });

  const handleSignIn = async (email, password) => {
    try {
      const response = await signIn(email, password);
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

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SignUpForm } from '../../components/auth/signup-form';
import { useAuth } from '../../context/AuthContext';
import isSignedIn from '../../utils/isSignedIn';

const SignUp = () => {
  const { signUp, signIn, authError } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn()) history.push('/alimentar');
  });

  const handleSubmit = async data => {
    setLoading(true);
    const { username, email, password } = data;
    try {
      const response = await signUp(username, email, password);
      if (response?.status === 201) {
        await signIn(email, password);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return <SignUpForm onSubmit={handleSubmit} loading={loading} error={error || authError} />;
};

export default SignUp;

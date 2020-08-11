import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import { makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { GoogleSignInButton } from '../../../components/auth/google';

const useStyles = makeStyles({ googleButton: { width: '100%', marginTop: '1rem' } });

const SignIn = ({ ...rest }) => {
  const { googleButton } = useStyles();
  const { signInGoogle } = useAuth();
  const { t } = useTranslation();

  const onSuccess = async res => {
    await signInGoogle(res.tokenId);
  };

  const onFailure = res => {
    // eslint-disable-next-line no-console
    console.error(res);
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess,
    onFailure
  });

  return (
    <GoogleSignInButton signIn={signIn} variant="contained" className={googleButton} {...rest}>
      {t('auth.actions.signInGoogle')}
    </GoogleSignInButton>
  );
};

export default SignIn;

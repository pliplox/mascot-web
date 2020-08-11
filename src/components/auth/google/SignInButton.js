import React from 'react';
import { func } from 'prop-types';
import Button from '@material-ui/core/Button';
import { GoogleIcon } from '../../icons';

const SignInButton = ({ signIn, ...rest }) => {
  return <Button startIcon={<GoogleIcon />} onClick={signIn} {...rest} />;
};

SignInButton.propTypes = {
  signIn: func.isRequired
};

export default SignInButton;

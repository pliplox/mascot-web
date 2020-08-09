import React, { useEffect } from 'react';
import { node } from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import isSignedIn from '../../utils/isSignedIn';

const PrivateRoute = ({ children, ...rest }) => {
  const history = useHistory();

  useEffect(() => {
    if (!isSignedIn()) history.push('/signin');
  }, [history]);

  return <Route {...rest}>{children}</Route>;
};

PrivateRoute.defaultProps = {
  children: undefined
};

PrivateRoute.propTypes = {
  children: node
};

export default PrivateRoute;

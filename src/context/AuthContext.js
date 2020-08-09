import React, { createContext, useState, useEffect, useMemo, useContext } from 'react';
import { node } from 'prop-types';
import mascotapi from '../api/mascotapi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [authError, setAuthError] = useState();

  useEffect(() => {
    const loadUser = () => {
      const getToken = localStorage.getItem('tokenId');
      if (!getToken) {
        setLoadingUser(false);
        return;
      }
      try {
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await mascotapi.post('signin', { email, password });
      setUser(response?.data); // For now: all data is set to the user
      localStorage.setItem('tokenId', response?.data?.tokenId);
      return response;
    } catch (error) {
      return setAuthError(error.message);
    }
  };

  const signUp = async (name, email, password) => {
    try {
      const response = await mascotapi.post('signup', { name, email, password });
      return response;
    } catch (error) {
      console.log(error);
      return setAuthError(error.message);
    }
  };

  /**
   * Authenticate with google
   * @param {string} tokenId The token id from the google sign in response
   *
   */
  const signInGoogle = async tokenId => {
    try {
      const response = await mascotapi.post('signingoogle', { token: tokenId });
      const responseToken = response?.data?.token?.jwtoken;
      setUser(response?.data?.user);
      if (responseToken) localStorage.setItem('tokenId', responseToken);
      return response;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('error', error);
      return setAuthError(error?.message);
    }
  };

  const value = useMemo(() => {
    return { user, loadingUser, signIn, signUp, authError, signInGoogle };
  }, [user, loadingUser, authError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be inside AuthContext provider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: node.isRequired
};

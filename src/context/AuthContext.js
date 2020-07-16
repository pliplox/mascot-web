import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import mascotapi from '../api/mascotapi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [authError, setAuthError] = useState();

  useEffect(() => {
    const loadUser = () => {
      const getToken = localStorage.getItem("tokenId");
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

  const signIn = (email, password) => {
    try {
      const response = {
        data: {
          email,
          password,
          groups: [],
          pets: [],
          tokenId: "cualquiercosa",
        },
      };
      setUser(response.data); // For now: all data is set to the user
      localStorage.setItem("tokenId", response.data.tokenId);
    } catch (error) {
      console.log(error);
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

  const value = useMemo(() => {
    return { user, loadingUser, signIn, signUp, authError };
  }, [user, loadingUser, authError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside AuthContext provider");
  }
  return context;
};

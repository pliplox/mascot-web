import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

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
      const response = { data: { email, password, groups: [],tokenId: "cualquiercosa" } };
      setUser(response.data); // For now: all data is set to the user
      localStorage.setItem("tokenId", response.data.tokenId);
      console.log(localStorage.getItem("tokenId"));
      console.log(user);

    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(() => {
    return { user, loadingUser, signIn };
  }, [user, loadingUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside AuthContext provider");
  }
  return context;
};

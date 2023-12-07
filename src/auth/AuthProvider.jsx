/**
 * This AuthProvider file makes sure that app has acccess to the logged in user information
 * useContext is a react hook that is used to share state between deeply nested components or components in general. We can avoid prop drilling when useContext is used.
 * All the child components that are wrapped in by this comonent, has access to the state that this component has!
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const setToLocalStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

function useAuthSource() {
  const [user, setUser] = useState(null);
  const [isStateLoading, setIsStateLoading] = useState(true);

  useEffect(() => {
    const user = getFromLocalStorage("user");
    setUser(user);
    setIsStateLoading(false);
  }, []);

  /**
   * Does 2 things
   * 1. Sets the user to the state
   * 2. Saves the state in the local storage to persist the user on refresh
   */
  const setAuthDetails = useCallback((user) => {
    setUser(user);
    setToLocalStorage("user", user);
  }, []);

  const logout = useCallback(() => {
    setToLocalStorage("user", null);
    setUser(null);
  }, []);

  return { isStateLoading, user, setAuthDetails, logout };
}

export const AuthContext = createContext(undefined);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={useAuthSource()}>
      {children}
    </AuthContext.Provider>
  );
}

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getFromLocalStorage, setToLocalStorage } from "../auth";

function useAuthSource() {
  const [user, setUser] = useState(null);
  const [isStateLoading, setIsStateLoading] = useState(true);

  useEffect(() => {
    const user = getFromLocalStorage("user");
    setUser(user);
    setIsStateLoading(false);
  }, []);

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

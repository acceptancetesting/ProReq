// src/context/AuthContext.tsx

import { jwtDecode } from "jwt-decode";
import React, { createContext, useState, useEffect, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
}

interface User {
  id: number;
  email: string;
  roles: { projectId: number; roleName: string }[];
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  setAuthenticated: () => {},
  setUser: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Use useEffect to check for token and set user state
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Decode token and set user
      const decoded: any = jwtDecode(token);
      setAuthenticated(true);
      setUser({
        id: decoded.sub,
        email: decoded.username,
        roles: decoded.roles,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

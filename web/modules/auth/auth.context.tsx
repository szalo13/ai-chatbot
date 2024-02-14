// context/auth-context.js
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../const";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  error: any;
  login: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const useUse = useUser();
  console.log(useUse);
  const { user, error, isLoading } = useUse;
  const isAuthenticated = !!user;

  const login = async () => {
    window.location.href = `${API_URL}/auth/login`;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, isLoading, error, login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

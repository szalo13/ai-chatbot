"use client";

// context/auth-context.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../const";
import { useSearchParams } from "next/navigation";

interface AuthContextProps {
  authorized: boolean;
  login: () => void;
  logout: () => void;
  getToken: () => string | null;
}

const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const [authorized, setAuthorized] = useState(true);
  const searchParams = useSearchParams();

  const login = async () => {
    window.location.href = `${API_URL}/auth/login`;
  };

  const logout = () => {
    removeToken();
    setAuthorized(false);
    login();
  };

  useEffect(() => {
    const token = searchParams.get("accessToken") || getToken();

    if (!token) {
      login();
    }

    if (token) {
      setToken(token);
      setAuthorized(true);
      // searchParams.delete();
      return;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ login, getToken, logout, authorized }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

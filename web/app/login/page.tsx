"use client";

import { useEffect } from "react";
import { useAuth } from "../../modules/auth/auth.context";

const LoginPage = () => {
  const auth = useAuth();

  useEffect(() => {
    auth.login();
  }, []);

  return <div></div>;
};

export default LoginPage;

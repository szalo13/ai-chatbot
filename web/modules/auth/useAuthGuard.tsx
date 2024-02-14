import { useEffect } from "react";
import { useAuth } from "./auth.context";

export const useAuthGuard = () => {
  const { authorized, login } = useAuth();

  useEffect(() => {
    if (!authorized) {
      // Redirect to the login page
      login();
    }
  }, [authorized]);
};

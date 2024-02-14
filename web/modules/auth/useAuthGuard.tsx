import { useEffect } from "react";
import { useAuth } from "./auth.context";
import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to the login page
      // login();
    }
  }, [isAuthenticated, isLoading, router]);
};

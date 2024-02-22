"use client";

import { useEffect } from "react";
import { useAuthGuard } from "../../../modules/auth/useAuthGuard";
import { useRouter } from "next/navigation";

const LoginCallbackPage = () => {
  const router = useRouter();

  useAuthGuard();

  useEffect(() => {
    router.push("/dashboard");
  }, []);

  return (
    <div className="mt-12">
      <h1>Logging in...</h1>
    </div>
  );
};

export default LoginCallbackPage;

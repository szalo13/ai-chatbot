import { UserProvider } from "@auth0/nextjs-auth0/client";
import { AuthProvider } from "../modules/auth/auth.context";

export default function App({ Component, pageProps }: any) {
  return (
    <UserProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </UserProvider>
  );
}

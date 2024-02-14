"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../modules/auth/auth.context";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <AuthProvider>{children}</AuthProvider>
        </UserProvider>
      </body>
    </html>
  );
}

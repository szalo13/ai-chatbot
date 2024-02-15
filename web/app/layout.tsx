"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../modules/auth/auth.context";
import MainLayoutTemplate from "../components/layouts/MainLayoutTemplate";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MainLayoutTemplate>{children}</MainLayoutTemplate>
        </AuthProvider>
      </body>
    </html>
  );
}

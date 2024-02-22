"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../modules/auth/auth.context";
import { WebSocketProvider } from "../modules/web-socket/context";

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
          <WebSocketProvider>{children}</WebSocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

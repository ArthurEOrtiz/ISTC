import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./shared/header";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "@/Utilities/authConfig";


const inter = Inter({ subsets: ["latin"] });
const msalInstance = new PublicClientApplication(msalConfig);

export const metadata: Metadata = {
  title: "ISTC Education",
  description: "Idaho State Tax Commission Education Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MsalProvider instance={msalInstance}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </MsalProvider>
  );
}

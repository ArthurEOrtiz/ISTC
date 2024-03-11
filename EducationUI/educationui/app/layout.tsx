import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./shared/header";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

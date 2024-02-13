import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ISTC Education",
  description: "Idaho State Tax Commission Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Head>
      <html lang="en"></html>
    </Head>
      <body className={inter.className}>
        <Header />
        {children}
        </body>
    </>
  );
}

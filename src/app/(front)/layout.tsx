import { Suspense } from "react";
import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/navbar";

const promptFont = Prompt({
  weight: ['400', '500', '700'],
  subsets: ['thai'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "ระบบ E-Commerce",
  description: "เรียนรู้การเขียน Nex.tjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${promptFont.className} font-sans`}>
      <body>
        <Suspense fallback={<div className="h-16 border-b bg-background" />}>
        <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}

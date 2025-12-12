import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfitSans = Outfit({
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Connect Four",
  description: "A classic Connect Four game built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfitSans.variable} antialiased dark`}>
        {children}
      </body>
    </html>
  );
}

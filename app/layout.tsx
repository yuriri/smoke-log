import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import StoreProviders from "./StoreProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smoke Log",
  description: "Count how many tobaccos you smoke each day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProviders>
          {children}
        </StoreProviders>
        </body>
    </html>
  );
}

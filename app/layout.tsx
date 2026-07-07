import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import StoreProviders from "./StoreProvider";
import LogOut from "@/app/components/LogOut";
import { createClient } from "@/lib/supabase/server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: '400'
});

export const metadata: Metadata = {
  title: "Smoke Log",
  description: "Count how many tobaccos you smoke each day.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoniModa.className} h-full antialiased bg-black`}
    >
      <body className="min-h-full flex flex-col">
        <main className="main">
          <section className={`box border-2 border-emerald-800 flex flex-col items-center`}>
            <h1 className={`text-gray-100 pt-16 text-5xl text-center font-bold ${bodoniModa.className}`}>Smoke Log</h1>
            <StoreProviders>
              {children}
            </StoreProviders>
          </section>
          {user && <LogOut />}
        </main>
      </body>
    </html>
  );
}

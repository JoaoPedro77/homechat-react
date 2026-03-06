import type { Metadata } from "next";
import { Fredoka, Nabla } from "next/font/google";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

const nabla = Nabla({
  variable: "--font-nabla",
  subsets: ["latin"],
});

import "./globals.css";
import MeuHeader from "./components/MeuHeader";

export const metadata: Metadata = {
  title: "Home Chat - O lar da conversa",
  description: "Vamo conversando, Vamo conversando!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="dark" suppressHydrationWarning>
      <body
        className={`${fredoka.variable} ${nabla.variable} antialiased bg-background min-h-screen flex flex-col`}
      >
        <MeuHeader />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

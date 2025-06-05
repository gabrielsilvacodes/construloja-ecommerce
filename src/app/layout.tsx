import { Providers } from "@/components/Providers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Construloja",
  description: "Tudo para sua construção e reforma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-light text-neutral min-h-screen flex flex-col`}
      >
        <Providers>
          <Header />
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

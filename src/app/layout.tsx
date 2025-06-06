import { Providers } from "@/components/Providers";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Fonte personalizada
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
    <html lang="pt-BR">
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="theme-color" content="#2D6A4F" />
      </head>
      <body className="bg-light text-neutral">
        <div className={inter.className}>
          <Providers>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main
                role="main"
                className="flex-1 w-full px-4 py-8 sm:py-10 max-w-7xl mx-auto"
              >
                {children}
              </main>
              <Footer />
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}

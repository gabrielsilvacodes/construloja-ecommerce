"use client";

import { AuthProvider } from "@/context/AuthContext";
import { CarrinhoProvider } from "@/context/CarrinhoContext";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <AuthProvider>
        <CarrinhoProvider>{children}</CarrinhoProvider>
      </AuthProvider>
    </HeroUIProvider>
  );
}

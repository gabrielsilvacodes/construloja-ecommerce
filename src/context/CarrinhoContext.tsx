// src/context/CarrinhoContext.tsx
"use client";

import { ItemCarrinho, useCarrinho } from "@/hooks/useCarrinho";
import { createContext, useContext } from "react";

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionar: (item: Omit<ItemCarrinho, "quantity">) => void;
  remover: (id: number) => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  limpar: () => void;
  total: number;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined
);

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const carrinho = useCarrinho();

  return (
    <CarrinhoContext.Provider value={carrinho}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinhoContext() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error(
      "useCarrinhoContext deve ser usado dentro de CarrinhoProvider"
    );
  }
  return context;
}

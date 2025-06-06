"use client";

import { createContext, useContext, useEffect, useState } from "react";

export interface ItemCarrinho {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

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
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("carrinho");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) setItens(parsed);
      } catch (e) {
        console.warn("Erro ao carregar carrinho:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  const adicionar = (item: Omit<ItemCarrinho, "quantity">) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === item.id);
      if (existente) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const remover = (id: number) =>
    setItens((prev) => prev.filter((i) => i.id !== id));

  const alterarQuantidade = (id: number, quantidade: number) => {
    setItens((prev) =>
      quantidade <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity: quantidade } : i))
    );
  };

  const limpar = () => setItens([]);

  const total = itens.reduce((soma, i) => soma + i.price * i.quantity, 0);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, remover, alterarQuantidade, limpar, total }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  }
  return context;
}

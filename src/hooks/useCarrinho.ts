"use client";

import { useEffect, useState } from "react";

export interface ItemCarrinho {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export function useCarrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  // ✅ Carrega do localStorage com fallback e proteção SSR
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const data = localStorage.getItem("carrinho");
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setItens(parsed);
        }
      }
    } catch (error) {
      console.warn("Erro ao carregar carrinho:", error);
    }
  }, []);

  // 💾 Salva no localStorage sempre que mudar
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  // ➕ Adiciona item ao carrinho
  const adicionar = (item: Omit<ItemCarrinho, "quantity">) => {
    setItens((prev) => {
      const existe = prev.find((i) => i.id === item.id);
      if (existe) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ❌ Remove item do carrinho
  const remover = (id: number) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  // 🔁 Altera quantidade de um item
  const alterarQuantidade = (id: number, quantidade: number) => {
    setItens((prev) =>
      quantidade <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, quantity: quantidade } : i))
    );
  };

  // 🧹 Limpa carrinho
  const limpar = () => setItens([]);

  // 💲 Total calculado
  const total = itens.reduce(
    (soma, item) => soma + item.price * item.quantity,
    0
  );

  return {
    itens,
    adicionar,
    remover,
    alterarQuantidade,
    limpar,
    total,
  };
}

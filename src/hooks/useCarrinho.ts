"use client";

import { useEffect, useState } from "react";

// Tipo de item no carrinho
export interface ItemCarrinho {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export function useCarrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);

  // 🧠 Função para carregar carrinho do localStorage
  const carregarCarrinho = () => {
    try {
      const data = localStorage.getItem("carrinho");
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setItens(parsed);
        }
      }
    } catch (error) {
      console.error("[Carrinho] Erro ao carregar do localStorage:", error);
    }
  };

  // ⏬ Carregar ao montar (somente client-side)
  useEffect(() => {
    if (typeof window !== "undefined") {
      carregarCarrinho();
    }
  }, []);

  // ⏫ Salvar ao mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("carrinho", JSON.stringify(itens));
    }
  }, [itens]);

  // ➕ Adicionar produto
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

  // ❌ Remover produto
  const remover = (id: number) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  // 🔁 Atualizar quantidade
  const alterarQuantidade = (id: number, quantidade: number) => {
    if (quantidade <= 0) return remover(id);
    setItens((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: quantidade } : i))
    );
  };

  // 🧹 Limpar carrinho
  const limpar = () => setItens([]);

  // 💰 Total calculado
  const total = itens.reduce(
    (acc, item) => acc + item.price * item.quantity,
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

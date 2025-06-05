"use client";

import { Pedido, listarPedidos } from "@/utils/pedidos";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MeusPedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    try {
      const dados = listarPedidos();
      setPedidos(dados);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    }
  }, []);

  if (pedidos.length === 0) {
    return (
      <main className="text-center py-20 text-neutral">
        <h1 className="text-2xl font-bold mb-4">Nenhum pedido encontrado.</h1>
        <Link href="/produtos" className="text-primary underline">
          Ver produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-neutral">
      <h1 className="text-2xl font-bold text-primary mb-8">Meus Pedidos</h1>

      <ul className="space-y-8">
        {pedidos
          .slice()
          .reverse()
          .map((pedido) => (
            <li
              key={pedido.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">
                  Pedido #{pedido.id.slice(0, 8).toUpperCase()}
                </h2>
                <span className="text-sm text-gray-500">
                  {new Date(pedido.data).toLocaleString("pt-BR")}
                </span>
              </div>

              <ul className="space-y-1 text-sm mb-2">
                {pedido.itens.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.title} × {item.quantity}
                    </span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>

              <p className="text-right font-bold text-primary">
                Total: R$ {pedido.total.toFixed(2)}
              </p>
            </li>
          ))}
      </ul>
    </main>
  );
}

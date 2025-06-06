"use client";

import { useAuth } from "@/context/AuthContext";
import { Pedido, listarPedidos } from "@/utils/pedidos";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MeusPedidosPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      try {
        const dados = listarPedidos();
        const ordenados = dados.sort(
          (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
        );
        setPedidos(ordenados);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-[60vh] text-primary">
        <p className="animate-pulse">Carregando...</p>
      </main>
    );
  }

  if (!user) return null;

  if (pedidos.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center text-neutral space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Nenhum pedido encontrado.
        </h1>
        <Button
          as="a"
          href="/produtos"
          variant="ghost"
          color="primary"
          className="text-base font-medium px-5 py-2 rounded-md transition-all hover:bg-primary/10 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
        >
          Ver produtos
        </Button>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-neutral">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-10">
        Meus Pedidos
      </h1>

      <ul className="space-y-6">
        {pedidos.map((pedido) => (
          <li
            key={pedido.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
              <h2 className="font-semibold text-base sm:text-lg text-neutral-800">
                Pedido #{pedido.id.slice(0, 8).toUpperCase()}
              </h2>
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(pedido.data).toLocaleString("pt-BR")}
              </span>
            </div>

            <ul className="divide-y divide-gray-100 text-sm mb-3">
              {pedido.itens.map((item) => (
                <li
                  key={item.id}
                  className="py-1 flex items-start justify-between gap-4 text-neutral-700"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-sm text-gray-500">× {item.quantity}</p>
                  </div>
                  <span className="whitespace-nowrap font-medium">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-right text-sm sm:text-base font-bold text-primary">
              Total: R$ {pedido.total.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}

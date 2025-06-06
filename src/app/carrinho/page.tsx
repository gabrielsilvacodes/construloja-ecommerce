"use client";

import { useAuth } from "@/context/AuthContext";
import { useCarrinho } from "@/context/CarrinhoContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CarrinhoPage() {
  const { itens, alterarQuantidade, remover, total, limpar } = useCarrinho();
  const { user } = useAuth();
  const router = useRouter();

  const handleFinalizarCompra = () => {
    router.push(user ? "/checkout" : "/login");
  };

  if (itens.length === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center text-neutral space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">
          Seu carrinho está vazio <span aria-hidden>🛒</span>
        </h1>

        <Link href="/produtos" passHref>
          <Button
            as="a"
            href="/produtos"
            variant="ghost"
            color="primary"
            className="text-base font-medium px-5 py-2 rounded-md transition-all hover:bg-primary/10 active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            aria-label="Ver produtos disponíveis"
          >
            Ver produtos
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-neutral space-y-10">
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        Seu Carrinho
      </h1>

      <ul className="space-y-6">
        {itens.map((item) => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-4"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="object-contain bg-white rounded shadow"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-sm md:text-base">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                R$ {item.price.toFixed(2)} × {item.quantity}
              </p>
              <label htmlFor={`quantidade-${item.id}`} className="sr-only">
                Quantidade
              </label>
              <input
                id={`quantidade-${item.id}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  alterarQuantidade(item.id, parseInt(e.target.value))
                }
                className="w-20 mt-2 border rounded px-3 py-1 text-sm"
              />
            </div>

            <Button
              variant="ghost"
              color="danger"
              onClick={() => remover(item.id)}
              className="text-sm font-medium px-4 py-2 rounded-md transition-all
              hover:bg-danger/10 active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger/40"
            >
              Remover
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4">
        <strong className="text-xl md:text-2xl">
          Total: <span className="text-primary">R$ {total.toFixed(2)}</span>
        </strong>

        <div className="flex flex-wrap gap-3 justify-end">
          <Button
            variant="ghost"
            color="danger"
            onClick={limpar}
            className="text-sm font-medium px-4 py-2 rounded-md transition-all
            hover:bg-danger/10 active:scale-[0.97]
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-danger/40"
          >
            Limpar Carrinho
          </Button>

          <Button
            color="primary"
            onClick={handleFinalizarCompra}
            className="text-sm font-semibold text-white bg-primary px-6 py-2 rounded-md transition-all
            hover:bg-primary/90 active:scale-[0.97]
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useCarrinhoContext } from "@/context/CarrinhoContext";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

export default function CarrinhoPage() {
  const { itens, alterarQuantidade, remover, total, limpar } =
    useCarrinhoContext();

  if (itens.length === 0) {
    return (
      <main className="text-center py-20 text-neutral">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio 🛒</h1>
        <Link href="/produtos" className="text-primary underline">
          Ver produtos
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-neutral space-y-8">
      <h1 className="text-2xl font-bold text-primary">Seu Carrinho</h1>

      <ul className="space-y-6">
        {itens.map((item) => (
          <li key={item.id} className="flex gap-4 items-center">
            <Image
              src={item.image}
              alt={item.title}
              width={80}
              height={80}
              className="object-contain bg-white rounded shadow"
            />
            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-500">
                R$ {item.price.toFixed(2)} x {item.quantity}
              </p>
              <input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) =>
                  alterarQuantidade(item.id, parseInt(e.target.value))
                }
                className="w-16 mt-2 border rounded px-2 py-1"
              />
            </div>
            <Button
              color="danger"
              variant="light"
              onClick={() => remover(item.id)}
            >
              Remover
            </Button>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center">
        <strong className="text-xl">Total: R$ {total.toFixed(2)}</strong>
        <div className="flex gap-3">
          <Button color="danger" variant="light" onClick={limpar}>
            Limpar Carrinho
          </Button>
          <Link href="/checkout">
            <Button color="primary">Finalizar Compra</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

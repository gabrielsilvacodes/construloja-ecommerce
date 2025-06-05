"use client";

import { useCarrinhoContext } from "@/context/CarrinhoContext";
import { registrarPedido } from "@/utils/pedidos";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { itens, total, limpar } = useCarrinhoContext();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");

  const finalizarPedido = () => {
    if (!nome.trim() || !email.trim() || !endereco.trim()) {
      setErro("Preencha todos os campos corretamente.");
      return;
    }

    registrarPedido(itens, total);
    limpar();
    router.push("/pedido-finalizado");
  };

  if (itens.length === 0) {
    return (
      <main className="text-center py-20 text-neutral">
        <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio 🛒</h1>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 text-neutral space-y-10">
      <h1 className="text-2xl font-bold text-primary">Finalizar Compra</h1>

      {/* 🧾 Resumo dos Produtos */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
        <ul className="divide-y divide-gray-200">
          {itens.map((item) => (
            <li key={item.id} className="py-2 flex justify-between">
              <span>
                {item.title}{" "}
                <span className="text-gray-500">× {item.quantity}</span>
              </span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-right font-bold text-lg mt-4">
          Total: R$ {total.toFixed(2)}
        </p>
      </section>

      {/* 📦 Formulário de Entrega */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Dados para Entrega</h2>
        <Input
          label="Nome completo"
          value={nome}
          onValueChange={setNome}
          fullWidth
        />
        <Input
          label="E-mail"
          value={email}
          onValueChange={setEmail}
          fullWidth
        />
        <Input
          label="Endereço completo"
          value={endereco}
          onValueChange={setEndereco}
          fullWidth
        />

        {erro && <p className="text-red-600 text-sm font-medium">{erro}</p>}

        <Button color="primary" fullWidth onClick={finalizarPedido}>
          Finalizar Pedido
        </Button>
      </section>
    </main>
  );
}

"use client";

import { useAuth } from "@/context/AuthContext";
import { useCarrinho } from "@/context/CarrinhoContext";
import { registrarPedido } from "@/utils/pedidos";
import { Button, Input } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { itens, total, limpar } = useCarrinho();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  const [erro, setErro] = useState("");

  // 🔐 Redireciona se não estiver logado
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // ✅ Limpa erro ao digitar
  useEffect(() => {
    if (nome && email && endereco) {
      setErro("");
    }
  }, [nome, email, endereco]);

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

      {/* 🧾 Resumo do Pedido */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Resumo do Pedido</h2>
        <ul className="divide-y divide-gray-200">
          {itens.map((item) => (
            <li key={item.id} className="py-2 flex justify-between text-sm">
              <span>
                {item.title}{" "}
                <span className="text-gray-500">× {item.quantity}</span>
              </span>
              <span className="font-medium">
                R$ {(item.price * item.quantity).toFixed(2)}
              </span>
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

        <div className="space-y-1">
          <label
            htmlFor="nome"
            className="font-medium text-sm text-neutral-700"
          >
            Nome completo:
          </label>
          <Input
            id="nome"
            name="nome"
            value={nome}
            onValueChange={setNome}
            placeholder="Seu nome completo"
            fullWidth
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="email"
            className="font-medium text-sm text-neutral-700"
          >
            E-mail:
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onValueChange={setEmail}
            placeholder="exemplo@email.com"
            fullWidth
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="endereco"
            className="font-medium text-sm text-neutral-700"
          >
            Endereço completo:
          </label>
          <Input
            id="endereco"
            name="endereco"
            value={endereco}
            onValueChange={setEndereco}
            placeholder="Rua, número, complemento, bairro, cidade, estado"
            fullWidth
            required
          />
        </div>

        {erro && (
          <p className="text-sm text-red-600 font-medium mt-2">{erro}</p>
        )}

        <Button
          onClick={finalizarPedido}
          type="button"
          fullWidth
          className="bg-primary text-white font-semibold px-6 py-2 rounded-md shadow-sm hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
        >
          Finalizar Pedido
        </Button>
      </section>
    </main>
  );
}

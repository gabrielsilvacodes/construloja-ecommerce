"use client";

import ErroProduto from "@/components/feedback/ErroProduto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { buscarProdutoPorId } from "@/services/fakeStore";
import { Badge, Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  params: {
    id: string;
  };
}

export default function ProdutoPage({ params }: Props) {
  const [produto, setProduto] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const { adicionar } = useCarrinho(); // ✅ hook de carrinho centralizado

  useEffect(() => {
    async function carregarProduto() {
      try {
        const p = await buscarProdutoPorId(params.id);
        setProduto(p);
      } catch {
        setProduto({ id: 0 });
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [params.id]);

  const adicionarAoCarrinho = () => {
    if (!produto) return;
    adicionar({
      id: produto.id,
      title: produto.title,
      price: produto.price,
      image: produto.image,
    });
    setMensagem("✅ Produto adicionado ao carrinho!");
    setTimeout(() => setMensagem(""), 3000);
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen text-primary animate-pulse">
        Carregando...
      </div>
    );
  }

  if (produto?.id === 0) return <ErroProduto />;

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Imagem do Produto */}
        <div className="relative w-full h-96 bg-white rounded-xl shadow overflow-hidden">
          <Image
            src={produto.image}
            alt={produto.title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Informações do Produto */}
        <div className="space-y-4 text-neutral">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">
            {produto.title}
          </h1>

          <Badge color="secondary" className="text-sm px-3 py-1 rounded-full">
            {produto.category}
          </Badge>

          <p className="text-lg leading-relaxed">{produto.description}</p>

          <p className="text-2xl font-bold text-primary">
            R$ {produto.price.toFixed(2)}
          </p>

          <Button
            color="primary"
            size="lg"
            className="mt-4 w-full sm:w-auto"
            onClick={adicionarAoCarrinho}
          >
            Adicionar ao Carrinho
          </Button>

          {mensagem && (
            <p className="text-green-600 text-sm mt-2 font-medium">
              {mensagem}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

"use client";

import ErroProduto from "@/components/feedback/ErroProduto";
import { useCarrinho } from "@/context/CarrinhoContext";
import { buscarProdutoPorId, Produto } from "@/services/fakeStore";
import { Badge, Button } from "@heroui/react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProdutoClientProps {
  id: string;
}

const formatarCategoria = (cat: string) => {
  switch (cat.toLowerCase()) {
    case "jewelery":
      return "Joias";
    case "men's clothing":
      return "Masculino";
    case "women's clothing":
      return "Feminino";
    case "electronics":
      return "Eletrônicos";
    default:
      return cat;
  }
};

export default function ProdutoClient({ id }: ProdutoClientProps) {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const [adicionado, setAdicionado] = useState(false);

  const { adicionar } = useCarrinho();

  useEffect(() => {
    async function carregarProduto() {
      try {
        const p = await buscarProdutoPorId(id);
        if (!p || !p.id) throw new Error();
        setProduto(p);
      } catch {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarProduto();
  }, [id]);

  const adicionarAoCarrinho = () => {
    if (!produto) return;
    adicionar({
      id: produto.id,
      title: produto.title,
      price: produto.price,
      image: produto.image,
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen text-primary animate-pulse">
        Carregando...
      </div>
    );
  }

  if (erro || !produto) return <ErroProduto />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Imagem do Produto */}
        <div className="relative w-full h-96 bg-white rounded-xl shadow overflow-hidden">
          <Image
            src={produto.image}
            alt={produto.title}
            fill
            unoptimized
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
            {formatarCategoria(produto.category)}
          </Badge>

          <p className="text-base leading-relaxed text-neutral-700 whitespace-pre-line">
            {produto.description}
          </p>

          <p className="text-2xl font-bold text-primary">
            R$ {produto.price.toFixed(2)}
          </p>

          <Button
            size="lg"
            disabled={adicionado}
            onClick={adicionarAoCarrinho}
            aria-label={
              adicionado
                ? "Produto adicionado ao carrinho"
                : "Adicionar ao carrinho"
            }
            className={`mt-4 w-full sm:w-auto flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all duration-300
              ${
                adicionado
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-primary text-white hover:bg-primary/90 active:scale-[0.98] focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
              }`}
          >
            {adicionado ? (
              <>
                <CheckCircle size={18} />
                Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                Adicionar ao Carrinho
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCarrinho } from "@/context/CarrinhoContext";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { CheckCircle, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardProdutoProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category?: string;
}

export function CardProduto({
  id,
  title,
  price,
  image,
  category,
}: CardProdutoProps) {
  const { adicionar } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);

  const handleAdicionar = () => {
    adicionar({ id, title, price, image });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2000);
  };

  return (
    <Card
      as="article"
      className="h-full w-full max-w-sm shadow-md hover:shadow-lg transition rounded-xl flex flex-col justify-between bg-white"
    >
      <CardHeader>
        <div className="w-full aspect-[4/3] sm:aspect-square bg-white rounded-md overflow-hidden relative p-4">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized // necessário para imagens externas (ex: FakeStoreAPI)
            className="object-contain"
          />
        </div>
      </CardHeader>

      <CardBody className="flex flex-col justify-between flex-grow space-y-3 px-4 pb-5 text-neutral">
        <div className="space-y-1">
          {category && (
            <p className="text-xs text-gray-500 capitalize truncate">
              {category}
            </p>
          )}

          <h3
            className="text-sm font-semibold leading-snug line-clamp-2"
            title={title}
          >
            {title}
          </h3>

          <p className="text-primary text-lg font-bold">
            R$ {price.toFixed(2)}
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-auto">
          {/* Botão Ver Detalhes — usando Button com as="a" corretamente */}
          <Button
            as={Link}
            href={`/produtos/${id}`}
            fullWidth
            variant="solid"
            color="primary"
            className="text-sm font-semibold text-white rounded-md py-2 transition-all hover:brightness-110 active:scale-[0.98] focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            aria-label={`Ver detalhes de ${title}`}
          >
            Ver Detalhes
          </Button>

          {/* Botão Adicionar ao Carrinho */}
          <Button
            fullWidth
            disabled={adicionado}
            onClick={handleAdicionar}
            aria-live="polite"
            aria-label={
              adicionado
                ? "Produto adicionado ao carrinho"
                : "Adicionar ao carrinho"
            }
            className={`text-sm font-semibold flex items-center justify-center gap-2 rounded-md py-2 transition-all duration-300
              ${
                adicionado
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "border border-secondary text-secondary hover:bg-secondary/10 active:scale-[0.98] focus:ring-2 focus:ring-offset-2 focus:ring-secondary/50"
              }`}
          >
            {adicionado ? (
              <>
                <CheckCircle size={16} />
                Adicionado!
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                Adicionar ao Carrinho
              </>
            )}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

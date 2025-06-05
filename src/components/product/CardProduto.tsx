"use client";

import { useCarrinhoContext } from "@/context/CarrinhoContext";
import { Badge, Button, Card, CardBody, CardHeader } from "@heroui/react";
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
  const { adicionar } = useCarrinhoContext();
  const [mensagem, setMensagem] = useState("");

  const handleAdicionar = () => {
    adicionar({ id, title, price, image });
    setMensagem("✅ Adicionado ao carrinho!");
    setTimeout(() => setMensagem(""), 2000);
  };

  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition">
      <CardHeader>
        <div className="relative w-full h-48 rounded-md overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </CardHeader>

      <CardBody className="space-y-3 text-neutral">
        {category && (
          <Badge color="secondary" className="text-xs px-3 py-1 rounded-full">
            {category}
          </Badge>
        )}

        <h3 className="text-base font-semibold line-clamp-2">{title}</h3>
        <p className="text-primary text-lg font-bold">R$ {price.toFixed(2)}</p>

        <div className="flex flex-col gap-2">
          <Link href={`/produtos/${id}`}>
            <Button variant="solid" color="primary" fullWidth>
              Ver Detalhes
            </Button>
          </Link>

          <Button
            variant="bordered"
            color="secondary"
            fullWidth
            onClick={handleAdicionar}
          >
            Adicionar ao Carrinho
          </Button>

          {mensagem && (
            <p className="text-green-600 text-xs font-medium text-center">
              {mensagem}
            </p>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

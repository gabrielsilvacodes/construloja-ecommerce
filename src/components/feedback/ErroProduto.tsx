"use client";

import { Alert, Button } from "@heroui/react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function ErroProduto() {
  return (
    <div className="max-w-xl mx-auto text-center py-16 px-4">
      <Alert color="danger" variant="bordered" className="mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger" />
          <span className="font-medium">
            Ops! Não foi possível carregar os dados do produto.
          </span>
        </div>
      </Alert>

      <p className="text-sm text-neutral-600 mb-6">
        Pode ser que o produto não exista mais ou houve um problema na conexão.
        Tente novamente mais tarde.
      </p>

      <Link href="/produtos">
        <Button color="primary" variant="solid">
          Voltar para Produtos
        </Button>
      </Link>
    </div>
  );
}

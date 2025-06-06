"use client";

import { Alert, Button } from "@heroui/react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ErroProduto() {
  return (
    <div className="max-w-xl mx-auto flex flex-col items-center justify-center px-4 text-center py-16 sm:py-20">
      {/* 🔔 Alerta visual com acessibilidade */}
      <Alert
        color="danger"
        variant="bordered"
        className="mb-6"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center gap-3 justify-center">
          <AlertTriangle className="w-6 h-6 text-danger" />
          <span className="font-semibold text-sm sm:text-base">
            Ops! Não foi possível carregar os dados do produto.
          </span>
        </div>
      </Alert>

      {/* 🧾 Mensagem descritiva */}
      <p className="text-sm text-neutral-600 mb-6 max-w-md">
        Pode ser que o produto não exista mais ou houve um problema na conexão.
        Tente novamente mais tarde.
      </p>

      {/* 🔁 Botão com estilo coerente */}
      <Link href="/produtos" passHref>
        <Button
          as="a"
          color="primary"
          variant="solid"
          size="lg"
          className="gap-2  text-white font-medium px-6 py-2.5 rounded-md shadow-sm hover:brightness-110 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Produtos
        </Button>
      </Link>
    </div>
  );
}

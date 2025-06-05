"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function PedidoFinalizadoPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] text-center text-neutral px-4">
      <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />

      <h1 className="text-2xl font-bold text-primary mb-2">
        Pedido Realizado com Sucesso!
      </h1>

      <p className="text-base text-neutral-600 max-w-md mb-6">
        Obrigado por comprar conosco. Seu pedido está sendo processado e
        entraremos em contato assim que for enviado.
      </p>

      <Link href="/produtos">
        <Button color="primary" size="lg">
          Continuar Comprando
        </Button>
      </Link>
    </main>
  );
}

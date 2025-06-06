"use client";

import { useAuth } from "@/context/AuthContext";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PedidoFinalizadoPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center text-neutral space-y-6">
      {/* Ícone de sucesso */}
      <CheckCircleIcon
        className="w-20 h-20 text-green-500"
        aria-hidden="true"
      />

      {/* Título */}
      <h1 className="text-2xl md:text-3xl font-bold text-primary">
        Pedido Realizado com Sucesso!
      </h1>

      {/* Mensagem de confirmação */}
      <p className="text-base text-neutral-600 max-w-md leading-relaxed">
        Obrigado por comprar conosco. Seu pedido está sendo processado e
        entraremos em contato assim que for enviado.
      </p>

      {/* Ações */}
      <div className="flex flex-wrap gap-4 justify-center pt-2">
        <Link href="/meus-pedidos" passHref>
          <Button
            as="a"
            variant="bordered"
            color="secondary"
            size="lg"
            className="font-medium rounded-md px-6 py-2 hover:bg-secondary/10 transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary/40"
            aria-label="Ver seus pedidos"
          >
            Ver seus pedidos
          </Button>
        </Link>

        <Link href="/produtos" passHref>
          <Button
            as="a"
            color="primary"
            size="lg"
            className="text-white font-semibold rounded-md px-6 py-2 hover:bg-primary/90 transition-all active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
            aria-label="Continuar comprando"
          >
            Continuar Comprando
          </Button>
        </Link>
      </div>
    </main>
  );
}

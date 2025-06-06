"use client";

import { Button } from "@heroui/react";
import { AlertTriangle, ArrowLeft, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center text-neutral py-16 sm:py-20">
      {/* 🔔 Alerta visual de erro */}
      <div
        className="flex items-center gap-3 text-danger mb-6"
        role="alert"
        aria-live="polite"
      >
        <AlertTriangle className="w-6 h-6" />
        <h1 className="text-2xl sm:text-3xl font-bold font-display">
          Ocorreu um erro inesperado
        </h1>
      </div>

      {/* 🧾 Mensagem descritiva */}
      <p className="text-sm sm:text-base text-neutral-600 mb-6 max-w-md">
        {error?.message ||
          "Algo deu errado ao carregar a página. Tente novamente mais tarde."}
      </p>

      {/* 🔁 Ações claras */}
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <Button
          color="primary"
          size="lg"
          variant="solid"
          onClick={reset}
          className="gap-2 px-6 py-2.5"
        >
          <RotateCcw className="w-4 h-4" />
          Tentar novamente
        </Button>

        <Button
          color="secondary"
          size="lg"
          variant="ghost"
          onClick={() => router.push("/")}
          className="gap-2 px-6 py-2.5"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a Home
        </Button>
      </div>
    </main>
  );
}

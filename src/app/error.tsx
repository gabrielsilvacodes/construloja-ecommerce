"use client";

import { Button } from "@heroui/react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 text-neutral gap-6">
      <h1 className="text-3xl md:text-4xl font-display font-bold text-danger">
        Ocorreu um erro inesperado
      </h1>

      <p className="text-base md:text-lg max-w-md">
        {error?.message ||
          "Algo deu errado ao carregar a página. Tente novamente mais tarde."}
      </p>

      <Button color="primary" variant="solid" onClick={() => reset()}>
        Tentar novamente
      </Button>
    </div>
  );
}

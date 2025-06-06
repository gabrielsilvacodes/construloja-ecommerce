"use client";

export default function Loading() {
  return (
    <section
      className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-primary gap-4 text-center"
      role="status"
      aria-live="polite"
    >
      {/* Spinner acessível */}
      <svg
        className="h-10 w-10 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>

      {/* Mensagem coerente com tom do projeto */}
      <p className="text-sm sm:text-base font-medium text-neutral-700 animate-pulse">
        Carregando os dados... aguarde um instante.
      </p>
    </section>
  );
}

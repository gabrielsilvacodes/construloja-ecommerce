"use client";

import { Button } from "@heroui/react";

export default function HeroBanner() {
  return (
    <section
      className="relative h-[60vh] md:h-[75vh] w-full flex items-center justify-center bg-cover bg-center rounded-b-2xl overflow-hidden"
      style={{
        backgroundImage: "url('/images/banner-madeira.jpg')",
      }}
    >
      {/* Sombra escura por cima da imagem */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
          Tudo para sua
          <br /> construção e reforma
        </h1>

        <Button
          as="a"
          href="/produtos"
          variant="solid"
          color="primary"
          className="text-base px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition"
        >
          Ver Produtos
        </Button>
      </div>
    </section>
  );
}

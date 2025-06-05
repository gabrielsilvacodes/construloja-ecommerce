"use client";

import {
  BrickWall,
  Building2,
  PaintRoller,
  SquareKanban,
  Wrench,
} from "lucide-react";
import Link from "next/link";

const categorias = [
  { nome: "Madeira", query: "men's clothing", icone: Building2 },
  { nome: "Tijolos", query: "women's clothing", icone: BrickWall },
  { nome: "Ferramentas", query: "jewelery", icone: Wrench },
  { nome: "Tintas", query: "electronics", icone: PaintRoller },
  { nome: "Revestimentos", query: "", icone: SquareKanban }, // todos os produtos
];

export default function ProductCategories() {
  return (
    <section className="bg-light py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary mb-8">
          Categorias de Produtos
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center text-neutral">
          {categorias.map(({ nome, query, icone: Icon }) => (
            <Link
              key={nome}
              href={`/produtos${query ? `?categoria=${query}` : ""}`}
              className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
            >
              <Icon size={32} className="text-primary" />
              <span className="text-sm font-medium">{nome}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

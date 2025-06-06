// src/app/produtos/[id]/page.tsx
import ProdutoClient from "@/components/product/ProdutoClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detalhes do Produto",
  description: "Informações sobre o produto selecionado",
};

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProdutoClient id={id} />;
}

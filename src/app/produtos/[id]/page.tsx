import ProdutoClient from "@/components/product/ProdutoClient";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <ProdutoClient id={params.id} />;
}

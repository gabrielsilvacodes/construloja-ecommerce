"use client";

import { useEffect, useState } from "react";
import { buscarProdutos, Produto } from "@/services/fakeStore";
import { CardProduto } from "@/components/product/CardProduto";
import { Button } from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  const categorias = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  useEffect(() => {
    async function fetch() {
      try {
        const data = await buscarProdutos();
        setProdutos(data);
      } catch {
        setProdutos([]);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  useEffect(() => {
    const categoriaURL = searchParams.get("categoria") || "";
    setCategoriaSelecionada(categoriaURL);
  }, [searchParams]);

  const selecionarCategoria = (categoria: string) => {
    const query = categoria ? `?categoria=${categoria}` : "";
    router.push(`/produtos${query}`);
  };

  const produtosFiltrados = categoriaSelecionada
    ? produtos.filter(
        (p) => p.category.toLowerCase() === categoriaSelecionada.toLowerCase()
      )
    : produtos;

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 text-neutral space-y-8">
      <h1 className="text-3xl font-bold text-primary">Todos os Produtos</h1>

      {/* Filtros por Categoria */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={!categoriaSelecionada ? "solid" : "bordered"}
          onClick={() => selecionarCategoria("")}
        >
          Todos
        </Button>
        {categorias.map((cat) => (
          <Button
            key={cat}
            size="sm"
            variant={categoriaSelecionada === cat ? "solid" : "bordered"}
            color="secondary"
            onClick={() => selecionarCategoria(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Grid ou Carregando... */}
      {loading ? (
        <p className="text-center text-primary animate-pulse">
          Carregando produtos...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <CardProduto
              key={produto.id}
              id={produto.id}
              title={produto.title}
              price={produto.price}
              image={produto.image}
              category={produto.category}
            />
          ))}
        </div>
      )}
    </main>
  );
}

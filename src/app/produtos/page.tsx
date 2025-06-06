"use client";

import { CardProduto } from "@/components/product/CardProduto";
import { buscarProdutos, Produto } from "@/services/fakeStore";
import { Button } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const LIMITE_INICIAL = 8;
const INCREMENTO = 8;

const categorias = [
  { label: "Masculino", value: "men's clothing" },
  { label: "Feminino", value: "women's clothing" },
  { label: "Joias", value: "jewelery" },
  { label: "Eletrônicos", value: "electronics" },
];

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [limiteVisivel, setLimiteVisivel] = useState(LIMITE_INICIAL);

  const searchParams = useSearchParams();
  const router = useRouter();

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
    setLimiteVisivel(LIMITE_INICIAL);

    const heading = document.getElementById("titulo-produtos");
    heading?.scrollIntoView({ behavior: "smooth" });
  }, [searchParams]);

  const selecionarCategoria = (categoria: string) => {
    const query = categoria ? `?categoria=${categoria}` : "";
    router.push(`/produtos${query}`);
  };

  const produtosFiltrados = useMemo(() => {
    if (categoriaSelecionada) {
      return produtos.filter(
        (p) => p.category.toLowerCase() === categoriaSelecionada.toLowerCase()
      );
    }
    return produtos.slice(0, limiteVisivel);
  }, [produtos, categoriaSelecionada, limiteVisivel]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 text-neutral space-y-10">
      <h1
        id="titulo-produtos"
        className="text-3xl font-bold text-primary scroll-mt-24"
      >
        Todos os Produtos
      </h1>

      {/* Filtros por Categoria */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={!categoriaSelecionada ? "solid" : "ghost"}
          color="primary"
          onClick={() => selecionarCategoria("")}
          aria-current={!categoriaSelecionada ? "page" : undefined}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
            !categoriaSelecionada
              ? "bg-primary text-white"
              : "text-primary hover:bg-primary/10"
          }`}
        >
          Todos
        </Button>

        {categorias.map((cat) => {
          const ativo = categoriaSelecionada === cat.value;
          return (
            <Button
              key={cat.value}
              size="sm"
              variant={ativo ? "solid" : "ghost"}
              color="secondary"
              onClick={() => selecionarCategoria(cat.value)}
              aria-pressed={ativo}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all
                active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-${
                  ativo ? "secondary" : "primary"
                }/40
                ${
                  ativo
                    ? "bg-secondary text-white"
                    : "text-secondary hover:bg-secondary/10"
                }`}
            >
              {cat.label}
            </Button>
          );
        })}
      </div>

      {/* Grid ou Loading */}
      {loading ? (
        <p className="text-center text-primary animate-pulse">
          Carregando produtos...
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ease-in-out">
            {produtosFiltrados.map((produto) => (
              <div
                key={produto.id}
                className="animate-fadeIn"
                style={{ animationDelay: "100ms", animationDuration: "400ms" }}
              >
                <CardProduto
                  id={produto.id}
                  title={produto.title}
                  price={produto.price}
                  image={produto.image}
                  category={produto.category}
                />
              </div>
            ))}
          </div>

          {/* Botão Ver Mais */}
          {!categoriaSelecionada && limiteVisivel < produtos.length && (
            <div className="text-center">
              <Button
                onClick={() => setLimiteVisivel((prev) => prev + INCREMENTO)}
                variant="bordered"
                color="primary"
                className="mt-8 text-base font-semibold px-6 py-2 rounded-md transition-all
                  hover:bg-primary/10
                  active:scale-[0.97]
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/40
                  inline-flex items-center gap-2"
              >
                Carregar mais produtos
                <ChevronDown size={16} />
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

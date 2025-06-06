import { CardProduto } from "@/components/product/CardProduto";
import { buscarProdutos } from "@/services/fakeStore";
import { Button } from "@heroui/react";
import { ChevronRight } from "lucide-react";

const CATEGORIAS = ["Eletrônicos", "Roupas", "Joias", "Casa"];
const LIMITE_PRODUTOS = 8;

export default async function FeaturedProducts() {
  const produtos = await buscarProdutos();

  return (
    <section
      className="bg-light py-16 px-4 sm:px-6 md:px-8"
      aria-label="Seção de produtos em destaque"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary mb-4">
          Produtos em Destaque
        </h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIAS.map((categoria) => (
            <Button
              key={categoria}
              size="sm"
              variant="bordered"
              color="primary"
              className="rounded-full"
              isDisabled
              aria-disabled="true"
              title={`Categoria ${categoria} (em breve)`}
            >
              {categoria}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.slice(0, LIMITE_PRODUTOS).map((produto) => (
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
        <div className="text-center mt-10">
          <Button
            as="a"
            href="/produtos"
            variant="ghost"
            color="primary"
            className="group text-sm font-semibold text-primary px-4 py-2 rounded-md transition-all
      hover:bg-primary/10
      active:scale-[0.98]
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50
      inline-flex items-center gap-2"
            aria-label="Ver todos os produtos"
          >
            Ver todos os produtos
            <ChevronRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Button>
        </div>
      </div>
    </section>
  );
}

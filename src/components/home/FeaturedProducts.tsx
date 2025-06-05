import { CardProduto } from "@/components/product/CardProduto";
import { buscarProdutos } from "@/services/fakeStore";
import { Button } from "@heroui/react";

const CATEGORIAS = ["Eletrônicos", "Roupas", "Joias", "Casa"];
const LIMITE_PRODUTOS = 8;

export default async function FeaturedProducts() {
  const produtos = await buscarProdutos();

  return (
    <section className="bg-light py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary mb-6">
          Produtos em Destaque
        </h2>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIAS.map((categoria) => (
            <Button
              key={categoria}
              size="sm"
              variant="bordered"
              color="primary"
              className="rounded-full"
              isDisabled
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
      </div>
    </section>
  );
}

// src/services/fakeStore.ts

export interface Produto {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

// Produto mock utilizado como fallback em erros
export const produtoMock: Produto = {
  id: 0,
  title: "Produto indisponível",
  price: 0,
  image: "/images/fallback.png",
  category: "Desconhecido",
  description: "Não foi possível carregar os detalhes deste produto.",
};

/**
 * Busca todos os produtos da FakeStore API.
 * Retorna pelo menos um item de fallback se houver erro.
 */
export async function buscarProdutos(): Promise<Produto[]> {
  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const data = (await res.json()) as Produto[];

    if (!Array.isArray(data)) throw new Error("Resposta inválida da API");

    return data;
  } catch (error) {
    console.error("[FakeStore] Falha ao buscar produtos:", error);
    return [produtoMock];
  }
}

/**
 * Busca um único produto pelo ID na FakeStore API.
 * Retorna um produto mock se houver erro ou ID inválido.
 * @param id ID do produto
 */
export async function buscarProdutoPorId(id: string): Promise<Produto> {
  try {
    const parsedId = Number(id);
    if (!parsedId || isNaN(parsedId)) {
      throw new Error("ID inválido: deve ser um número");
    }

    const res = await fetch(`https://fakestoreapi.com/products/${parsedId}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const data = (await res.json()) as Produto;

    if (!data || typeof data !== "object") {
      throw new Error("Produto malformado");
    }

    return data;
  } catch (error) {
    console.error(`[FakeStore] Erro ao buscar produto com id ${id}:`, error);
    return produtoMock;
  }
}

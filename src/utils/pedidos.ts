import { ItemCarrinho } from "@/hooks/useCarrinho";

export interface Pedido {
  id: string;
  data: string;
  itens: ItemCarrinho[];
  total: number;
}

/**
 * Recupera os pedidos existentes do localStorage.
 */
function carregarPedidos(): Pedido[] {
  try {
    const data = localStorage.getItem("pedidos");
    const parsed = JSON.parse(data || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.warn("Erro ao carregar pedidos do localStorage:", error);
    return [];
  }
}

/**
 * Registra um novo pedido no localStorage.
 * @param itens Itens do carrinho
 * @param total Valor total do pedido
 */
export function registrarPedido(itens: ItemCarrinho[], total: number): void {
  const pedidos = carregarPedidos();

  const novoPedido: Pedido = {
    id: crypto.randomUUID(),
    data: new Date().toISOString(),
    itens,
    total,
  };

  localStorage.setItem("pedidos", JSON.stringify([...pedidos, novoPedido]));
}

/**
 * Retorna todos os pedidos registrados.
 */
export function listarPedidos(): Pedido[] {
  return carregarPedidos();
}

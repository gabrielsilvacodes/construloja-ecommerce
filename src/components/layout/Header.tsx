"use client";

import { useAuth } from "@/context/AuthContext";
import { useCarrinho } from "@/hooks/useCarrinho";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const { itens } = useCarrinho();
  const pathname = usePathname();

  const totalItens = itens.reduce((acc, item) => acc + item.quantity, 0);

  const mostrarCarrinho = !["/login", "/cadastro"].includes(pathname);

  return (
    <header className="bg-primary text-white p-4 shadow">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl font-display font-bold">🏗️ Construloja</h1>

        <nav className="flex items-center gap-4 flex-wrap">
          <Link href="/" className="hover:underline">
            Início
          </Link>
          <Link href="/produtos" className="hover:underline">
            Produtos
          </Link>
          <Link href="/contato" className="hover:underline">
            Contato
          </Link>
          {user && (
            <Link href="/meus-pedidos" className="hover:underline">
              Meus Pedidos
            </Link>
          )}

          {mostrarCarrinho && (
            <Link href="/carrinho" className="relative hover:underline">
              Carrinho
              {totalItens > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-xs font-semibold px-2 py-0.5 rounded-full animate-pulse">
                  {totalItens}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm hidden sm:inline">
                Olá, <strong>{user}</strong>
              </span>
              <Button
                size="sm"
                variant="light"
                color="danger"
                className="text-white"
                onClick={logout}
              >
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

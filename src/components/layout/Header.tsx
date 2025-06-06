"use client";

import { useAuth } from "@/context/AuthContext";
import { useCarrinho } from "@/context/CarrinhoContext";
import { Button } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, logout } = useAuth();
  const { itens } = useCarrinho();
  const pathname = usePathname();

  const totalItens = itens.reduce((acc, item) => acc + item.quantity, 0);
  const mostrarCarrinho = !["/login", "/cadastro"].includes(pathname);

  const linkAtivo = (path: string) =>
    pathname === path || pathname.startsWith(path)
      ? "text-white font-semibold underline underline-offset-4"
      : "text-white/90 hover:text-white";

  return (
    <header className="bg-primary text-white p-4 shadow">
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4">
        {/* 🏗️ Logo com link acessível */}
        <Link href="/" aria-label="Ir para a página inicial">
          <h1 className="text-xl font-display font-bold whitespace-nowrap">
            🏗️ Construloja
          </h1>
        </Link>

        {/* 🌐 Navegação responsiva */}
        <nav className="flex items-center gap-x-6 flex-wrap md:flex-nowrap text-sm font-medium">
          <Link href="/" className={linkAtivo("/")}>
            Início
          </Link>
          <Link href="/produtos" className={linkAtivo("/produtos")}>
            Produtos
          </Link>
          <Link href="/contato" className={linkAtivo("/contato")}>
            Contato
          </Link>
          {user && (
            <Link href="/meus-pedidos" className={linkAtivo("/meus-pedidos")}>
              Meus Pedidos
            </Link>
          )}

          {/* 🛒 Carrinho com badge */}
          {mostrarCarrinho && (
            <Link
              href="/carrinho"
              className="relative inline-block hover:text-white"
              aria-label={`Carrinho com ${totalItens} item${
                totalItens !== 1 ? "s" : ""
              }`}
            >
              <span className={linkAtivo("/carrinho")}>Carrinho</span>
              {totalItens > 0 && (
                <span className="absolute top-0.5 right-[-0.5rem] bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {totalItens}
                </span>
              )}
            </Link>
          )}

          {/* 👤 Login ou Logout */}
          {user ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm hidden sm:inline">
                Olá, <strong>{user.split("@")[0]}</strong>
              </span>
              <Button
                size="sm"
                variant="ghost"
                color="danger"
                className="text-white hover:bg-red-600"
                onClick={async () => {
                  try {
                    await logout();
                  } catch (err) {
                    console.error("Erro ao sair:", err);
                  }
                }}
              >
                Sair
              </Button>
            </div>
          ) : (
            <Link href="/login" className={linkAtivo("/login")}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

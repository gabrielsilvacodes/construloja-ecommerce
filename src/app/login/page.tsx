"use client";

import { useAuth } from "@/context/AuthContext";
import { Alert, Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  // Foca no campo de e-mail ao carregar
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const sucesso = await login(email, password);

      if (sucesso) {
        router.push("/"); // redireciona após login
      } else {
        setErro("E-mail ou senha inválidos.");
      }
    } catch {
      setErro("Erro ao tentar fazer login. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4 text-neutral">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Entrar
      </h1>

      {erro && (
        <Alert color="danger" variant="bordered" className="mb-4">
          {erro}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* E-mail */}
        <div className="space-y-1">
          <label
            htmlFor="email"
            className="font-medium text-sm text-neutral-700"
          >
            E-mail:
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onValueChange={(val) => {
              setEmail(val);
              if (erro) setErro(""); // limpa erro ao digitar
            }}
            ref={emailRef}
            required
            fullWidth
          />
        </div>

        {/* Senha */}
        <div className="space-y-1">
          <label
            htmlFor="senha"
            className="font-medium text-sm text-neutral-700"
          >
            Senha:
          </label>
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onValueChange={(val) => {
              setPassword(val);
              if (erro) setErro(""); // limpa erro ao digitar
            }}
            required
            fullWidth
          />
        </div>

        {/* Botão */}
        <Button
          type="submit"
          color="primary"
          fullWidth
          isLoading={carregando}
          className="font-semibold text-white bg-primary px-6 py-2 rounded-md transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
          aria-label="Entrar na conta"
        >
          Entrar
        </Button>
      </form>

      {/* Link de cadastro */}
      <p className="text-sm text-center mt-4">
        Ainda não tem conta?{" "}
        <Link
          href="/cadastro"
          className="text-primary font-medium hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </main>
  );
}

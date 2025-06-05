"use client";

import { useAuth } from "@/context/AuthContext";
import { Alert, Button, Input } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    const sucesso = await login(email, password);

    if (sucesso) {
      router.push("/");
    } else {
      setErro("E-mail ou senha inválidos.");
    }

    setCarregando(false);
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
        Entrar
      </h1>

      {erro && (
        <Alert color="danger" variant="bordered" className="mb-4">
          {erro}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="E-mail"
          type="email"
          value={email}
          onValueChange={setEmail}
          placeholder="Digite seu e-mail"
          isRequired
          fullWidth
        />
        <Input
          label="Senha"
          type="password"
          value={password}
          onValueChange={setPassword}
          placeholder="Digite sua senha"
          isRequired
          fullWidth
        />
        <Button type="submit" color="primary" fullWidth isLoading={carregando}>
          Entrar
        </Button>
      </form>

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

"use client";

import { auth } from "@/lib/firebaseConfig";
import { Alert, Button, Input } from "@heroui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");
    setCarregando(true);

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setSucesso("Cadastro realizado com sucesso!");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "code" in error) {
        const err = error as { code: string };
        switch (err.code) {
          case "auth/email-already-in-use":
            setErro("E-mail já está em uso. Faça login ou use outro.");
            break;
          case "auth/invalid-email":
            setErro("E-mail inválido.");
            break;
          case "auth/weak-password":
            setErro("A senha deve ter pelo menos 6 caracteres.");
            break;
          default:
            setErro("Erro ao cadastrar. Tente novamente.");
        }
      } else {
        setErro("Erro ao cadastrar. Tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4 text-neutral">
      <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
        Criar Conta
      </h1>

      {erro && (
        <Alert color="danger" variant="bordered" className="mb-4">
          {erro}
        </Alert>
      )}

      {sucesso && (
        <Alert color="success" variant="bordered" className="mb-4">
          {sucesso}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo E-mail */}
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
              if (erro) setErro("");
            }}
            required
            fullWidth
          />
        </div>

        {/* Campo Senha */}
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
            placeholder="Digite uma senha"
            value={senha}
            onValueChange={(val) => {
              setSenha(val);
              if (erro) setErro("");
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
        >
          Criar Conta
        </Button>
      </form>
    </main>
  );
}

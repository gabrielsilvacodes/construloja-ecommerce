"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";
import { Input, Button, Alert } from "@heroui/react";

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
    } catch (error: any) {
      setErro(error.message || "Erro ao cadastrar");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold text-primary mb-6 text-center">
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          label="E-mail"
          value={email}
          onValueChange={setEmail}
          placeholder="Digite seu e-mail"
          isRequired
          fullWidth
        />
        <Input
          type="password"
          label="Senha"
          value={senha}
          onValueChange={setSenha}
          placeholder="Digite uma senha"
          isRequired
          fullWidth
        />
        <Button type="submit" color="primary" fullWidth isLoading={carregando}>
          Criar Conta
        </Button>
      </form>
    </main>
  );
}

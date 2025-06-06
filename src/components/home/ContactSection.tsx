"use client";

import { Button, Form, Input, Textarea } from "@heroui/react";
import { useState } from "react";

export default function ContactSection() {
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    console.log("Mensagem enviada:", Object.fromEntries(formData.entries()));
    setMensagemSucesso("Sua mensagem foi enviada com sucesso!");
    form.reset();
    setTimeout(() => setMensagemSucesso(""), 4000);
  };

  return (
    <section className="bg-white py-16 px-4 text-neutral">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* 🗺️ Mapa */}
        <div className="w-full aspect-[4/3] md:aspect-auto md:h-full rounded-xl overflow-hidden shadow">
          <iframe
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            title="Mapa da Madeireira São Miguel"
            aria-label="Mapa com a localização da loja"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2408752344377!2d-37.5066283252484!3d-6.335961693653695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a54518ff3dd77f%3A0xc8569f431fe9f779!2sMadeireira%20S%C3%A3o%20Miguel!5e1!3m2!1spt-BR!2sbr!4v1749059979330!5m2!1spt-BR!2sbr"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* 📩 Formulário */}
        <div className="flex flex-col gap-y-8">
          <header>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary mb-2">
              Fale com a gente
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Envie sua mensagem ou fale diretamente pelo WhatsApp. Estamos
              prontos para ajudar!
            </p>
          </header>

          <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
            <label
              htmlFor="nome"
              className="font-medium text-sm text-neutral-700"
            >
              Nome:
            </label>
            <Input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome completo"
              isRequired
              fullWidth
            />

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
              placeholder="seu@email.com"
              isRequired
              fullWidth
            />

            <label
              htmlFor="mensagem"
              className="font-medium text-sm text-neutral-700"
            >
              Mensagem:
            </label>
            <Textarea
              id="mensagem"
              name="mensagem"
              placeholder="Escreva sua dúvida ou solicitação"
              minRows={4}
              isRequired
              fullWidth
              className="resize-none min-h-[120px]"
            />

            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                aria-label="Enviar mensagem de contato"
                className="w-full sm:w-auto bg-primary text-white font-medium px-6 py-2 rounded-md shadow-md hover:shadow-lg transition hover:brightness-110"
              >
                Enviar Mensagem
              </Button>
            </div>

            {mensagemSucesso && (
              <p className="flex items-center gap-2 text-green-600 text-sm font-medium">
                ✅ {mensagemSucesso}
              </p>
            )}
          </Form>

          {/* 📍 Informações da Loja */}
          <address className="not-italic text-sm pt-6 border-t border-gray-200 dark:border-gray-700 space-y-1 leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p>
              <strong>Endereço:</strong> Rua Central, 123 – Cidade do Interior
            </p>
            <p>
              <strong>Telefone:</strong> (84) 99999-0000
            </p>
            <p>
              <strong>WhatsApp:</strong> (84) 98888-1111
            </p>
            <p>
              <strong>Email:</strong> contato@construloja.com
            </p>
          </address>
        </div>
      </div>
    </section>
  );
}

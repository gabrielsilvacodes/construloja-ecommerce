"use client";

import { Button, Form, Input, Textarea } from "@heroui/react";

export default function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Aqui você pode tratar os dados futuramente (ex: envio para backend ou WhatsApp)
    console.log("Mensagem enviada:", Object.fromEntries(formData.entries()));
  };

  return (
    <section className="bg-white py-16 px-4 text-neutral">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Mapa da loja */}
        <div className="w-full h-[300px] md:h-full rounded-xl overflow-hidden shadow">
          <iframe
            className="w-full h-full"
            loading="lazy"
            allowFullScreen
            title="Localização da Loja"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2408752344377!2d-37.5066283252484!3d-6.335961693653695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a54518ff3dd77f%3A0xc8569f431fe9f779!2sMadeireira%20S%C3%A3o%20Miguel!5e1!3m2!1spt-BR!2sbr!4v1749059979330!5m2!1spt-BR!2sbr"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Formulário e Informações */}
        <div className="space-y-8">
          <header>
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-primary mb-2">
              Fale com a gente
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Envie sua mensagem ou fale diretamente pelo WhatsApp. Estamos
              prontos para ajudar!
            </p>
          </header>

          <Form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nome"
              name="nome"
              type="text"
              placeholder="Seu nome completo"
              isRequired
              fullWidth
            />
            <Input
              label="E-mail"
              name="email"
              type="email"
              placeholder="seu@email.com"
              isRequired
              fullWidth
            />
            <Textarea
              label="Mensagem"
              name="mensagem"
              placeholder="Escreva sua dúvida ou solicitação"
              minRows={4}
              isRequired
            />
            <Button
              type="submit"
              color="primary"
              variant="solid"
              className="mt-4"
            >
              Enviar
            </Button>
          </Form>

          <address className="not-italic text-sm pt-6 border-t border-gray-200 dark:border-gray-700 space-y-1 leading-relaxed">
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

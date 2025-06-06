"use client";

export default function AboutSection() {
  return (
    <section
      className="bg-light py-16 px-4 text-neutral-700"
      role="region"
      aria-labelledby="about-title"
    >
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2
          id="about-title"
          className="text-2xl md:text-3xl font-display font-semibold text-primary"
        >
          Sobre a Loja
        </h2>

        <p className="text-base md:text-lg leading-relaxed">
          Fundada com o compromisso de oferecer materiais de qualidade para
          construção e reforma, a{" "}
          <strong className="font-semibold text-neutral-900">
            ConstruLoja
          </strong>{" "}
          é referência na região por seu atendimento diferenciado, variedade de
          produtos e tradição no mercado.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Trabalhamos com marcas confiáveis, equipe especializada e entregas
          rápidas, buscando sempre proporcionar a melhor experiência para nossos
          clientes. Seja para grandes obras ou pequenas reformas, conte conosco!
        </p>
      </div>
    </section>
  );
}

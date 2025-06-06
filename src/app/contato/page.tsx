import ContactSection from "@/components/home/ContactSection";
import Head from "next/head";

export default function ContatoPage() {
  return (
    <>
      <Head>
        <title>Contato | ConstruLoja</title>
        <meta
          name="description"
          content="Entre em contato com a ConstruLoja para dúvidas, orçamentos e atendimento personalizado."
        />
      </Head>
      <ContactSection />
    </>
  );
}

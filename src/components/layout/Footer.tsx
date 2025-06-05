export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-light text-center text-sm py-6 mt-auto">
      <p>© {ano} Construloja — Todos os direitos reservados.</p>
    </footer>
  );
}

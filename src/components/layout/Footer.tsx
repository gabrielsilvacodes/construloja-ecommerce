export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-neutral text-light text-center text-sm py-6 px-4"
    >
      <p className="max-w-screen-md mx-auto leading-relaxed">
        © {ano} <span className="font-semibold">Construloja</span>. Todos os
        direitos reservados.
      </p>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      {/* Espaço reservado para anúncio do Google AdSense */}
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6 text-center text-xs text-muted">
        <p>Image Changer — suas imagens não saem do seu navegador.</p>
        <nav className="flex gap-4">
          <Link href="/privacidade" className="hover:text-accent">
            Política de Privacidade
          </Link>
          <Link href="/termos-de-uso" className="hover:text-accent">
            Termos de Uso
          </Link>
          <Link href="/cookies" className="hover:text-accent">
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}


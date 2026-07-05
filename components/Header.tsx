import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-border bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <img src="/logo.png" alt="Image Changer" className="h-8 w-8" />
          Image Changer
        </Link>
        <span className="hidden font-mono text-xs text-muted sm:inline">
          conversão e edição de imagens no navegador
        </span>
      </div>
    </header>
  );
}



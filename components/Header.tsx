import Link from "next/link";
import { useLocale } from "../utils/i18n";
import { common } from "../locales/common";

export default function Header() {
  const locale = useLocale();
  const t = common[locale];

  return (
    <header className="border-b border-border bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-8 py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <img src="/logo.png" alt="Image Changer" className="h-8 w-8" />
          Image Changer
        </Link>
        <span className="hidden font-mono text-xs text-muted sm:inline">{t.headerTagline}</span>
      </div>
    </header>
  );
}

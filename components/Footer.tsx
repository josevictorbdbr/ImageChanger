import Link from "next/link";
import CoffeeButton from "./CoffeeButton";
import { useLocale } from "../utils/i18n";
import { common } from "../locales/common";

export default function Footer() {
  const locale = useLocale();
  const t = common[locale];

  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-6 text-center text-xs text-muted">
        <p>{t.footerTagline}</p>
        <nav className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/sobre" className="hover:text-accent">
            {t.footerAbout}
          </Link>
          <Link href="/privacidade" className="hover:text-accent">
            {t.footerPrivacy}
          </Link>
          <Link href="/termos-de-uso" className="hover:text-accent">
            {t.footerTerms}
          </Link>
          <a
            href="https://github.com/josevictorbdbr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            GitHub
          </a>
          <CoffeeButton />
        </nav>
      </div>
    </footer>
  );
}

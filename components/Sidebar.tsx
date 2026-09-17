import Link from "next/link";
import { useRouter } from "next/router";
import { useLocale } from "../utils/i18n";
import { sidebarText } from "../locales/sidebar";
import LanguageSwitcher from "./LanguageSwitcher";

// Rotas que ainda existem por SEO/link direto
const LEGACY_CONVERSION_PATHS = [
  "/",
  "/png-para-jpg",
  "/jpg-para-png",
  "/png-para-webp",
  "/webp-para-png",
  "/jpg-para-webp",
  "/webp-para-jpg",
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter();
  const locale = useLocale();
  const t = sidebarText[locale];

  const isConvertActive = LEGACY_CONVERSION_PATHS.includes(router.pathname);
  const isEditActive = router.pathname === "/editar-imagem";
  const isFaqActive = router.pathname === "/perguntas-frequentes";

  const navItemClass = (active: boolean) =>
    `flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
      active ? "bg-accent text-white" : "text-ink hover:bg-paper"
    }`;

  const content = (
    <div className="flex h-full flex-col">
      <Link
        href="/"
        onClick={onClose}
        className="flex items-center gap-2 px-4 py-5 font-display text-lg font-semibold text-ink"
      >
        <img src="/logo.png" alt="Image Changer" className="h-8 w-8" />
        Image Changer
      </Link>

      <nav className="flex flex-col gap-1 px-2">
        <Link href="/" onClick={onClose} className={navItemClass(isConvertActive)}>
          {t.convertNav}
        </Link>
        <Link href="/editar-imagem" onClick={onClose} className={navItemClass(isEditActive)}>
          {t.editNav}
        </Link>
        <Link href="/perguntas-frequentes" onClick={onClose} className={navItemClass(isFaqActive)}>
          {t.faqNav}
        </Link>
      </nav>

      <div className="mt-auto px-4 py-5">
        <LanguageSwitcher />
      </div>
    </div>
  );

  return (
    <>
      {/* PC: coluna fixa sempre visível */}
      <aside className="hidden lg:flex lg:w-56 lg:shrink-0 lg:border-r lg:border-border lg:bg-white">
        {content}
      </aside>

      {/* Mobile: gaveta que desliza */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 transform bg-white shadow-xl transition-transform lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {content}
      </aside>
    </>
  );
}

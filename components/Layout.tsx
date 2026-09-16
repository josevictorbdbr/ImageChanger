import { ReactNode, useState } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Barra superior: só existe no mobile, pra abrir a gaveta da sidebar */}
        <div className="flex items-center justify-between border-b border-border bg-paper/80 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/" className="flex items-center gap-2 font-display text-base font-semibold text-ink">
            <img src="/logo.png" alt="Image Changer" className="h-7 w-7" />
            Image Changer
          </Link>
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            className="rounded-lg p-2 text-ink hover:bg-paper"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

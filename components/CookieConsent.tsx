import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "image-changer-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const respond = (value: "accepted" | "rejected") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white p-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted">
          Usamos cookies para exibir anúncios através do Google AdSense. Veja nossa{" "}
          <Link href="/cookies" className="text-accent underline underline-offset-2">
            Política de Cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => respond("rejected")}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted hover:border-accent"
          >
            Rejeitar
          </button>
          <button
            onClick={() => respond("accepted")}
            className="rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-white hover:bg-accent-hover"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

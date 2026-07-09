import { useState } from "react";

const EMAIL = "josevictorbdbr@gmail.com";

export default function CoffeeButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="hover:text-accent">
        ☕ Me pague um café
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg">
            <p className="text-2xl">☕</p>
            <h2 className="mt-2 font-display text-lg font-semibold text-ink">Obrigado pelo apoio!</h2>
            <p className="mt-2 text-sm text-muted">Minha chave Pix é o mesmo e-mail abaixo:</p>
            <p className="mt-2 font-mono text-sm text-accent">{EMAIL}</p>
            <button
              onClick={() => setOpen(false)}
              className="mt-5 rounded-full bg-accent px-5 py-1.5 text-sm font-medium text-white hover:bg-accent-hover"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

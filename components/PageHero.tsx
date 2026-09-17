interface PageHeroProps {
  title: string;
  eyebrow?: string;
}

// Hero único usado em todas as páginas de ferramenta — antes cada página
// definia sua própria section com tamanhos diferentes (algumas ficaram
// grandes/antigas, outras compactas), o que quebrava a consistência visual.
export default function PageHero({ title, eyebrow }: PageHeroProps) {
  return (
    <section className="bg-dot-grid border-b border-border">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center">
        {eyebrow && (
          <span className="inline-block rounded-full bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-3 font-display text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
      </div>
    </section>
  );
}

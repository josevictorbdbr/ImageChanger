import Link from "next/link";
import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";

export default function NotFound() {
  return (
    <Layout>
      <SeoHead
        title="Página não encontrada"
        description="A página que você procura não existe ou foi movida."
        path="/404"
        noindex
      />

      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <span className="font-display text-7xl font-bold text-accent">404</span>
        <h1 className="mt-4 text-2xl font-semibold text-ink">Página não encontrada</h1>
        <p className="mt-2 text-muted">
          O link pode estar quebrado ou a página pode ter sido movida. Que tal voltar para o início?
        </p>
        <Link
          href="/"
          className="mt-6 rounded-full bg-accent px-6 py-2 font-medium text-white hover:bg-accent-hover"
        >
          Voltar para a página inicial
        </Link>
      </section>
    </Layout>
  );
}

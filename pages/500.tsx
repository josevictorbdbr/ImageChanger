import Link from "next/link";
import Layout from "../components/Layout";
import SeoHead from "../components/SeoHead";

export default function ServerError() {
  return (
    <Layout>
      <SeoHead
        title="Erro interno"
        description="Ocorreu um erro inesperado. Tente novamente em instantes."
        path="/500"
        noindex
      />

      <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <span className="font-display text-7xl font-bold text-accent">500</span>
        <h1 className="mt-4 text-2xl font-semibold text-ink">Ocorreu um erro</h1>
        <p className="mt-2 text-muted">
          Algo deu errado do nosso lado. Tente novamente em alguns instantes — se persistir, nos avise.
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

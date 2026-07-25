import { ReactNode } from "react";
import Layout from "./Layout";
import SeoHead from "./SeoHead";

interface LegalLayoutProps {
  title: string;
  path: string;
  updatedAt: string;
  description?: string;
  children: ReactNode;
}

export default function LegalLayout({ title, path, updatedAt, description, children }: LegalLayoutProps) {
  return (
    <Layout>
      <SeoHead title={title} description={description ?? `${title} do Image Changer.`} path={path} />

      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-ink">{title}</h1>
        <p className="mt-1 font-mono text-xs text-muted">Última atualização: {updatedAt}</p>
        <div className="legal mt-8">{children}</div>
      </article>
    </Layout>
  );
}

import { ReactNode } from "react";
import Link from "next/link";

interface ToolCardProps {
  href: string;
  title: string;
  description: string;
  icon?: ReactNode;
  badge?: string;
}

export default function ToolCard({ href, title, description, icon, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-border bg-white p-5 transition-colors hover:border-accent"
    >
      {(icon || badge) && (
        <div className="flex items-center gap-2">
          {icon && (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              {icon}
            </span>
          )}
          {badge && (
            <span className="rounded-md bg-paper px-2 py-1 font-mono text-xs text-muted">{badge}</span>
          )}
        </div>
      )}
      <h3 className="mt-3 font-display text-lg font-semibold text-ink group-hover:text-accent">
        {title}
      </h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
    </Link>
  );
}



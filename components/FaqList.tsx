export interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="mt-14">
      <h2 className="text-xl font-semibold text-ink">Perguntas frequentes</h2>
      <dl className="mt-4 space-y-5">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-medium text-ink">{item.question}</dt>
            <dd className="mt-1 text-sm text-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

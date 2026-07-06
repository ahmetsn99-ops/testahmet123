export interface FAQItem {
  frage: string;
  antwort: string;
}

export function FAQ({ items, title = "Häufige Fragen" }: { items: FAQItem[]; title?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.antwort,
      },
    })),
  };

  return (
    <section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h2 className="font-display text-2xl md:text-3xl mb-6">{title}</h2>
      <div className="space-y-3">
        {items.map((item, i) => (
          <details
            key={i}
            className="group rounded-xl border px-5 py-4"
            style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
          >
            <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium">
              {item.frage}
              <span className="shrink-0 transition-transform group-open:rotate-45 text-xl" style={{ color: "var(--gold)" }}>
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {item.antwort}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap" style={{ padding: "96px 24px", textAlign: "center" }}>
      <h1 style={{ fontSize: 40, marginBottom: 12 }}>404 – Wort nicht gefunden</h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>
        Dieses Substantiv ist noch nicht in unserer Wörterliste.
      </p>
      <Link href="/artikel" className="btn btn-primary" style={{ display: "inline-flex" }}>
        Zur Wörterliste →
      </Link>
    </div>
  );
}

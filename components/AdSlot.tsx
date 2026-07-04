/**
 * Platzhalter für Google AdSense.
 *
 * So aktivierst du echte Anzeigen:
 * 1. Erstelle ein AdSense-Konto und füge den Verifizierungscode in app/layout.tsx <head> ein:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-DEINE-ID" crossOrigin="anonymous" />
 * 2. Ersetze unten `data-ad-client` und `data-ad-slot` mit deinen echten Werten aus AdSense.
 * 3. Entferne den Platzhalter-Rahmen (className="ad-slot") und die <p>-Beschriftung.
 */
export default function AdSlot({
  label = "Anzeige",
  height = 100,
  variant = "banner",
}: {
  label?: string;
  height?: number;
  variant?: "banner" | "rectangle" | "sidebar";
}) {
  return (
    <div
      className="ad-slot"
      data-ad-variant={variant}
      style={{ height, width: "100%" }}
      aria-label="Anzeigenplatz"
    >
      {/*
        Echtes AdSense-Snippet (Beispiel, mit eigenen IDs ersetzen):

        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      {label}
    </div>
  );
}

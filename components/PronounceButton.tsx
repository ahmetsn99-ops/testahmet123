"use client";

export default function PronounceButton({ text }: { text: string }) {
  const sprechen = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button
      onClick={sprechen}
      aria-label={`${text} aussprechen`}
      title="Aussprache anhören"
      style={{
        border: "1px solid var(--line)",
        background: "var(--bg)",
        borderRadius: 8,
        width: 34,
        height: 34,
        display: "grid",
        placeItems: "center",
        cursor: "pointer",
        fontSize: 15,
      }}
    >
      🔊
    </button>
  );
}

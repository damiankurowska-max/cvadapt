export const metadata = {
  title: "Merci pour ta réponse ! — CVAdapt",
};

export default function MerciSondagePage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f7",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "40px 20px",
      textAlign: "center",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        padding: "48px 40px",
        maxWidth: "480px",
        width: "100%",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>🎁</div>
        <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#111827", margin: "0 0 12px" }}>
          +1 CV ajouté !
        </h1>
        <p style={{ fontSize: "16px", color: "#6b7280", margin: "0 0 32px", lineHeight: "1.6" }}>
          Merci pour ta réponse. Chaque question te rapporte <strong style={{ color: "#059669" }}>1 CV supplémentaire</strong>. Réponds aux 3 questions pour en avoir 3 au total.
        </p>
        <a
          href="https://cvadapt.eu/generate"
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: "12px",
            fontWeight: "700",
            fontSize: "15px",
            textDecoration: "none",
          }}
        >
          Générer mon CV optimisé →
        </a>
        <p style={{ marginTop: "24px", fontSize: "13px", color: "#9ca3af" }}>
          Tu peux fermer cette page et revenir à ton email pour répondre aux autres questions.
        </p>
      </div>
    </main>
  );
}

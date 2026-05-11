import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CVAdapt — Adapte ton CV à chaque offre en 30 secondes · Score ATS · Gratuit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          fontFamily: "sans-serif",
          background: "#0f172a",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient gauche bleu */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 80% at -10% 50%, #1d4ed8 0%, transparent 60%)",
          display: "flex",
        }} />

        {/* Gradient droite subtil */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 60% at 110% 20%, #3b0764 0%, transparent 50%)",
          display: "flex",
        }} />

        {/* Grille de points décorative */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Contenu principal */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}>

          {/* Header — Logo + badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: "56px", height: "56px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                boxShadow: "0 0 30px rgba(37,99,235,0.5)",
              }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: "white", display: "flex" }}>C</div>
              </div>
              <div style={{ fontSize: "32px", fontWeight: 800, color: "white", display: "flex", letterSpacing: "-0.5px" }}>
                CVAdapt
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "10px 20px",
              borderRadius: "100px",
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.4)",
            }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "flex" }} />
              <div style={{ fontSize: "16px", fontWeight: 700, color: "#4ade80", display: "flex" }}>3 CV gratuits · Sans CB</div>
            </div>
          </div>

          {/* Titre principal */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{
              fontSize: "68px", fontWeight: 900, color: "white",
              lineHeight: 1.05, letterSpacing: "-2px",
              display: "flex", flexDirection: "column",
            }}>
              <span style={{ display: "flex" }}>Ton CV passe les filtres</span>
              <span style={{ display: "flex", color: "#60a5fa" }}>en 30 secondes.</span>
            </div>
            <div style={{
              fontSize: "24px", color: "rgba(255,255,255,0.65)",
              display: "flex", maxWidth: "640px", lineHeight: 1.5,
            }}>
              Score ATS · Mots-cles manquants · Lettre de motivation incluse
            </div>
          </div>

          {/* Footer — Stats */}
          <div style={{ display: "flex", gap: "24px" }}>
            {[
              { value: "75%",   label: "des CV rejetes par algo" },
              { value: "30s",   label: "pour generer un CV" },
              { value: "4.8/5", label: "312 avis utilisateurs" },
            ].map(({ value, label }) => (
              <div key={label} style={{
                display: "flex", flexDirection: "column", gap: "4px",
                padding: "16px 24px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                flex: 1,
              }}>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "white", display: "flex" }}>{value}</div>
                <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", display: "flex" }}>{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    ),
    { ...size }
  );
}

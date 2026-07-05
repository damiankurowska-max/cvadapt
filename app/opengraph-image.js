import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CVAdapt — Adapte ton CV à chaque offre en 30 secondes · Score ATS · Gratuit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "1200px", height: "630px",
        display: "flex", flexDirection: "column",
        fontFamily: "sans-serif",
        background: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Dot grid background */}
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          backgroundImage: "radial-gradient(circle, #CBD5E1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.35,
        }} />

        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "40px 64px 0",
          position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Logo P */}
            <div style={{
              width: "44px", height: "44px", borderRadius: "10px",
              background: "linear-gradient(135deg, #7AAAF9, #3B6EE8)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: "22px", fontWeight: 900, color: "white", display: "flex" }}>P</div>
            </div>
            <div style={{ fontSize: "26px", fontWeight: 800, color: "#0F172A", display: "flex", letterSpacing: "-0.5px" }}>
              CVAdapt
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "8px",
            padding: "8px 18px", borderRadius: "999px",
            background: "#ECFDF5", border: "1px solid #A7F3D0",
          }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: "#065F46", display: "flex" }}>1 CV gratuit · Sans CB</div>
          </div>
        </div>

        {/* Main content */}
        <div style={{
          display: "flex", flex: 1,
          padding: "40px 64px",
          position: "relative", zIndex: 1,
          gap: "60px", alignItems: "center",
        }}>
          {/* Left — text */}
          <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "20px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "6px 14px", borderRadius: "999px",
              background: "#EFF6FF", border: "1px solid #BFDBFE",
              width: "fit-content",
            }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2563EB", display: "flex" }} />
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#2563EB", display: "flex" }}>Outil IA marché français</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ fontSize: "52px", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-2px", display: "flex", flexDirection: "column" }}>
                <span style={{ display: "flex" }}>T'as envoyé des CV</span>
                <span style={{ display: "flex" }}>partout.
                  <span style={{ color: "#2563EB", marginLeft: "16px" }}>Personne</span>
                </span>
                <span style={{ display: "flex", color: "#2563EB" }}>n'a répondu.</span>
              </div>
            </div>

            <div style={{ fontSize: "18px", color: "#475569", display: "flex", lineHeight: 1.5, maxWidth: "520px" }}>
              CVAdapt adapte ton CV aux filtres ATS en 30 secondes. Score ATS · Mots-clés · Lettre de motivation.
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              {[
                { value: "75%", label: "des CV filtrés par algo", color: "#EF4444" },
                { value: "30s", label: "pour générer un CV", color: "#10B981" },
                { value: "4.8/5", label: "312 avis utilisateurs", color: "#2563EB" },
              ].map(({ value, label, color }) => (
                <div key={label} style={{
                  display: "flex", flexDirection: "column", gap: "2px",
                  padding: "14px 20px", borderRadius: "14px",
                  background: "white", border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}>
                  <div style={{ fontSize: "26px", fontWeight: 900, color, display: "flex" }}>{value}</div>
                  <div style={{ fontSize: "12px", color: "#94A3B8", display: "flex" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — CV mockup card */}
          <div style={{
            display: "flex",
            background: "white", borderRadius: "20px",
            boxShadow: "0 20px 64px rgba(15,23,42,0.12)",
            padding: "24px", width: "240px",
            border: "1px solid #E2E8F0",
            flexDirection: "column", gap: "12px",
            position: "relative",
          }}>
            {/* Score badge */}
            <div style={{
              position: "absolute", top: "-14px", right: "-10px",
              background: "#10B981", borderRadius: "10px",
              padding: "6px 10px", display: "flex", flexDirection: "column",
              alignItems: "center", boxShadow: "0 8px 24px rgba(16,185,129,0.4)",
            }}>
              <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.85)", display: "flex" }}>Score ATS</div>
              <div style={{ fontSize: "20px", fontWeight: 900, color: "white", display: "flex" }}>91</div>
              <div style={{ fontSize: "7px", color: "rgba(255,255,255,0.75)", display: "flex" }}>/100</div>
            </div>
            {/* CV lines */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #E2E8F0", paddingBottom: "10px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #7C3AED)", display: "flex" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ width: "80px", height: "7px", background: "#0F172A", borderRadius: "4px", display: "flex" }} />
                <div style={{ width: "55px", height: "5px", background: "#E2E8F0", borderRadius: "3px", display: "flex" }} />
              </div>
            </div>
            {[90, 70, 85, 60].map((w, i) => (
              <div key={i} style={{ height: "5px", background: i % 2 === 0 ? "#E2E8F0" : "#F1F5F9", borderRadius: "3px", width: `${w}%`, display: "flex" }} />
            ))}
            <div style={{ display: "flex", gap: "4px" }}>
              {["React", "Python", "SQL"].map(s => (
                <div key={s} style={{ padding: "2px 6px", background: "#EFF6FF", borderRadius: "99px", fontSize: "7px", fontWeight: 700, color: "#2563EB", display: "flex" }}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

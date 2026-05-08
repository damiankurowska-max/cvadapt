import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CVAdapt — Génère un CV ATS en 30 secondes";
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cercles décoratifs */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-60px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            display: "flex",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100px",
            height: "100px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.15)",
            marginBottom: "32px",
            border: "2px solid rgba(255,255,255,0.3)",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              display: "flex",
            }}
          >
            C
          </div>
        </div>

        {/* Titre */}
        <div
          style={{
            fontSize: "80px",
            fontWeight: 900,
            color: "white",
            letterSpacing: "-2px",
            marginBottom: "16px",
            display: "flex",
          }}
        >
          CVAdapt
        </div>

        {/* Sous-titre */}
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255,255,255,0.90)",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
            marginBottom: "40px",
            display: "flex",
          }}
        >
          Adapte ton CV à chaque offre en 30 secondes
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: "16px" }}>
          {["✓ Score ATS", "✓ Mots-clés", "✓ Lettre de motivation"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 24px",
                borderRadius: "100px",
                background: "rgba(255,255,255,0.18)",
                color: "white",
                fontSize: "22px",
                fontWeight: 600,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL en bas */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            color: "rgba(255,255,255,0.6)",
            fontSize: "20px",
            display: "flex",
          }}
        >
          cvadapt.eu
        </div>
      </div>
    ),
    { ...size }
  );
}

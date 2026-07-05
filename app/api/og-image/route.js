import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const stat = searchParams.get("stat") || "75%";
  const statLabel = searchParams.get("statLabel") || "des CV filtrés avant d'être lus";
  const tip = searchParams.get("tip") || "CVAdapt adapte ton CV à chaque offre en 30 secondes.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Cercle décoratif en arrière-plan */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            border: "1px solid rgba(59,130,246,0.15)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            border: "1px solid rgba(59,130,246,0.08)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
          }}
        />

        {/* Badge haut */}
        <div
          style={{
            background: "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: "999px",
            padding: "8px 24px",
            marginBottom: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#93c5fd", letterSpacing: "0.1em", fontWeight: 600 }}>
            LE SAVIEZ-VOUS ?
          </span>
        </div>

        {/* Stat principale */}
        <div
          style={{
            fontSize: "160px",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1,
            marginBottom: "24px",
            display: "flex",
            letterSpacing: "-4px",
          }}
        >
          {stat}
        </div>

        {/* Label stat */}
        <div
          style={{
            fontSize: "32px",
            color: "#93c5fd",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "56px",
            maxWidth: "700px",
            lineHeight: 1.3,
            display: "flex",
          }}
        >
          {statLabel}
        </div>

        {/* Séparateur */}
        <div
          style={{
            width: "60px",
            height: "3px",
            background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
            borderRadius: "2px",
            marginBottom: "48px",
            display: "flex",
          }}
        />

        {/* Tip */}
        <div
          style={{
            fontSize: "24px",
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: "780px",
            lineHeight: 1.5,
            display: "flex",
          }}
        >
          {tip}
        </div>

        {/* Branding bas */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#3b82f6",
              display: "flex",
            }}
          />
          <span style={{ fontSize: "18px", color: "#64748b", fontWeight: 600 }}>
            cvadapt.eu
          </span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    }
  );
}

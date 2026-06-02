"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "64px",
        width: "100%",
        maxWidth: "900px",
      }}>
        {/* Left — value prop */}
        <div style={{
          flex: "1",
          maxWidth: "380px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          color: "#fff",
        }}
          className="sign-up-left"
        >
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "13px",
              color: "#a5b4fc",
              marginBottom: "20px",
            }}>
              <span>🎓</span>
              <span>Gratuit pour les étudiants · Sans carte bancaire</span>
            </div>
            <h1 style={{
              fontSize: "28px",
              fontWeight: "700",
              lineHeight: "1.25",
              margin: "0 0 12px",
            }}>
              Ton CV adapté à l&apos;offre en <span style={{ color: "#818cf8" }}>30 secondes</span>
            </h1>
            <p style={{
              fontSize: "15px",
              color: "#94a3b8",
              lineHeight: "1.6",
              margin: 0,
            }}>
              Crée ton compte gratuitement et génère ton premier CV optimisé ATS immédiatement.
            </p>
          </div>

          {/* Benefits */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { icon: "✓", text: "CV adapté à chaque offre en 30 sec" },
              { icon: "✓", text: "Score ATS pour passer les filtres" },
              { icon: "✓", text: "3 CV offerts sans carte bancaire" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                color: "#cbd5e1",
              }}>
                <span style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(99,102,241,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  color: "#818cf8",
                  flexShrink: 0,
                }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "16px",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}>
              <div style={{ display: "flex" }}>
                {["R", "E", "A", "T", "J"].map((l, i) => (
                  <div key={i} style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: `hsl(${i * 50 + 200}, 60%, 50%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#fff",
                    marginLeft: i > 0 ? "-8px" : 0,
                    border: "2px solid #0f172a",
                  }}>{l}</div>
                ))}
              </div>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>
                +500 étudiants cette semaine
              </span>
            </div>
            <div style={{ display: "flex", gap: "2px", marginBottom: "6px" }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: "#fbbf24", fontSize: "14px" }}>★</span>
              ))}
            </div>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: "1.5" }}>
              &quot;J&apos;ai décroché un entretien chez L&apos;Oréal grâce à un CV généré en 30 secondes.&quot;
            </p>
          </div>
        </div>

        {/* Right — Clerk form */}
        <div style={{ flexShrink: 0 }}>
          <SignUp
            routing="path"
            path="/sign-up"
            afterSignUpUrl="/generate"
            fallback={
              <div style={{ color: "#6b7280", fontSize: "15px" }}>
                Chargement du formulaire…
              </div>
            }
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sign-up-left { display: none !important; }
        }
      `}</style>
    </main>
  );
}

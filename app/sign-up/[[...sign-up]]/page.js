"use client";
import { SignUp, useUser } from "@clerk/nextjs";

export default function SignUpPage() {
  const { isLoaded } = useUser();

  return (
    <main style={{
      minHeight: "100vh",
      background: "#f9fafb",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      gap: "16px",
    }}>
      <SignUp
        routing="path"
        path="/sign-up"
        fallback={
          <div style={{ color: "#6b7280", fontSize: "15px" }}>
            Chargement du formulaire…
          </div>
        }
      />
      {!isLoaded && (
        <p style={{ color: "#9ca3af", fontSize: "13px" }}>
          Initialisation de l&apos;authentification…
        </p>
      )}
    </main>
  );
}

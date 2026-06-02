"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f9fafb",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <SignIn
        routing="path"
        path="/sign-in"
        fallback={
          <div style={{ color: "#6b7280", fontSize: "15px" }}>
            Chargement…
          </div>
        }
      />
    </main>
  );
}

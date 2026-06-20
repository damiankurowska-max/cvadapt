"use client";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import Logo from "@/app/components/Logo";

export default function SignUpPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8faff", display: "flex", flexDirection: "column", fontFamily: "'Outfit', system-ui, sans-serif" }}>
      <header style={{ padding: "20px 32px", display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
          <Logo size={32} />
          <span style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", letterSpacing: "-0.4px" }}>Postulera</span>
        </Link>
      </header>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
        <SignUp afterSignUpUrl="/generate" redirectUrl="/generate" signInUrl="/sign-in" />
      </div>
    </div>
  );
}

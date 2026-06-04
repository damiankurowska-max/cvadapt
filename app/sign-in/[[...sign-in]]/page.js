"use client";
import dynamic from "next/dynamic";

const SignIn = dynamic(
  () => import("@clerk/nextjs").then((m) => ({ default: m.SignIn })),
  { ssr: false, loading: () => null }
);

export default function SignInPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <SignIn />
    </div>
  );
}

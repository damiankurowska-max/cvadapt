"use client";
import dynamic from "next/dynamic";

const SignUp = dynamic(
  () => import("@clerk/nextjs").then((m) => ({ default: m.SignUp })),
  { ssr: false, loading: () => null }
);

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <SignUp />
    </div>
  );
}

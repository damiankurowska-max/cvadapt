"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <SignUp
        afterSignUpUrl="/generate"
        redirectUrl="/generate"
        signInUrl="/sign-in"
      />
    </div>
  );
}

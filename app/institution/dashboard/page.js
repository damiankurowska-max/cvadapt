"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function InstitutionDashboard() {
  const router = useRouter();
  useEffect(() => { router.push("/generate"); }, [router]);
  return null;
}

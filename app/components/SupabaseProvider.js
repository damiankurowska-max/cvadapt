"use client";
import { createContext, useContext, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SupabaseContext = createContext(null);

const SUPABASE_URL = "https://dhofekpfpunvabcrbfek.supabase.co";
const SUPABASE_ANON = "sb_publishable_2kAnmX2nmXkfWnCJioFoag_fSD2hwG2";

export function SupabaseProvider({ url, anonKey, children }) {
  const supabase = useMemo(
    () => createBrowserClient(
      SUPABASE_URL,
      SUPABASE_ANON
    ),
    []
  );
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const ctx = useContext(SupabaseContext);
  if (!ctx) throw new Error("useSupabase must be used inside SupabaseProvider");
  return ctx;
}

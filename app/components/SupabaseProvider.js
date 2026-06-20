"use client";
import { createContext, useContext, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";

const SupabaseContext = createContext(null);

export function SupabaseProvider({ url, anonKey, children }) {
  const supabase = useMemo(
    () => createBrowserClient(url, anonKey),
    [url, anonKey]
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

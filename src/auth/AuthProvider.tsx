"use client";

import React, { useState, createContext, useEffect, useCallback } from "react";
import validate from "@/actions/auth/validate";

export interface AuthContext {
  id: string | null;
  state: "notLoaded" | "isLoading" | "hasLoaded";
  refresh: () => void;
}

export const AuthProviderContext = createContext<AuthContext>({
  id: null,
  state: "notLoaded",
  refresh: () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, setProfile] = useState<{
    id: string | null;
    state: "notLoaded" | "isLoading" | "hasLoaded";
  }>({
    id: null,
    state: "notLoaded",
  });

  const refresh = useCallback(() => {
    if (profile.state === "isLoading") return;

    setProfile({ id: null, state: "isLoading" });

    (async () => {
      const result = await validate();

      if (result.error === false)
        setProfile({ id: result.payload, state: "hasLoaded" });
      else setProfile({ id: null, state: "hasLoaded" });
    })();
  }, [profile]);

  return (
    <AuthProviderContext.Provider value={{ ...profile, refresh }}>
      {children}
    </AuthProviderContext.Provider>
  );
}

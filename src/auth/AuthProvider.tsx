"use client";

import validate from "@/actions/auth/validate";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{ id: string | null; load: boolean }>({
  id: null,
  load: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [id, setID] = useState<string | null>(null);
  const [load, setLoad] = useState(false);

  // 처음 로드 시 기존 인증 정보를 불러옵니다.
  useEffect(() => {
    (async () => {
      setLoad(false);
      const result = await validate();

      if (result.error === false) {
        setID(result.payload);
      }

      setLoad(true);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ id, load }}>{children}</AuthContext.Provider>
  );
}

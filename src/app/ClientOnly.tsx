"use client";

import { useEffect, useState } from "react";

export function ClientOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Server에서 Component를 로드하는 경우 fallback component의 렌더 결과를 반환한다.
  if (!isClient) return fallback ?? null;

  return <>{children}</>;
}

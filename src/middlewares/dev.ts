import { ProductionEnvProhibitedError } from "@/utils/auth/error";
import { NextRequest, NextResponse } from "next/server";

// 개발 환경에서만 접근 가능하다.
const production = process.env.VERCEL_ENV === "production";

export async function middleware(request: NextRequest, response: NextResponse) {
  if (production) throw new ProductionEnvProhibitedError(403);
  return response;
}

export function matcher(path: string) {
  return path.includes("/dev/");
}

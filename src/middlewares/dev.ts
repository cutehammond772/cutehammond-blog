import { NextRequest, NextResponse } from "next/server";
import ProductionModeProhibitedError from "@/utils/auth/errors/ProductionModeProhibitedError";

// 개발 환경에서만 접근 가능하다.
const development = process.env.NODE_ENV == "development";

export async function middleware(request: NextRequest, response: NextResponse) {
  if (!development) throw new ProductionModeProhibitedError(401);
  return response;
}

export function matcher(path: string) {
  return path.includes("/dev/");
}

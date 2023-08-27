import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/utils/error";

// 개발 환경에서만 접근 가능하다.
const development = process.env.NODE_ENV == "development";
export const DEVELOPMENT_ENV_ONLY = "DEVELOPMENT_ENV_ONLY";

export async function middleware(
  request: NextRequest,
  response: NextResponse
): Promise<[boolean, NextResponse]> {
  const { pathname } = request.nextUrl;

  if (!development) {
    return [
      false,
      ErrorResponse({
        pathname,
        status: 403,
        error: "Forbidden",
        reason: [DEVELOPMENT_ENV_ONLY],
      }),
    ];
  }

  return [true, response];
}

export function matcher(path: string) {
  return path.includes("/dev/");
}

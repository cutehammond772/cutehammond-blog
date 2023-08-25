import { NextRequest, NextResponse } from "next/server";
import Auth from "@/features/auth/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 권한이 필요한 요청인 경우 검증을 진행한다.
  if (pathname.includes("/auth/")) {
    return Auth(request);
  }

  // ... 다른 Path에 대한 Middleware가 들어갈 수 있다.

  return NextResponse.next();
}

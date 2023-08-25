import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/features/error";
import { renew } from "@/features/auth/utils/token";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/features/auth/utils/type";

// 현재 프로덕션 상태인지 확인
const production = process.env.NODE_ENV == "production";

export async function POST(request: NextRequest) {
  const { id, pwd } = (await request.json()) as RegisterBody;

  if (!id || !pwd) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 400,
      error: "Bad Request",
      reason: "Invalid ID or Password.",
    });
  }

  const response = NextResponse.json({ message: "Successfully Registered." });

  const secret = process.env.JWT_SECRET!!;
  const renewal = await renew({ secret, id });

  if (!renewal) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 500,
      error: "Internal Server Error",
      reason: "Token cannot renew for some reason.",
    });
  }

  /**
   * 개발 환경에서는 Secure Option을 비활성화한다.
   * localhost의 경우 https가 아닌 http로 동작하기 때문이다.
   */
  response.cookies.set({
    name: ACCESS_TOKEN,
    value: renewal.accessToken,
    httpOnly: true,
    secure: production,
  });

  response.cookies.set({
    name: REFRESH_TOKEN,
    value: renewal.refreshToken,
    httpOnly: true,
    secure: production,
  });

  return response;
}

export interface RegisterBody {
  id?: string;
  pwd?: string;
}

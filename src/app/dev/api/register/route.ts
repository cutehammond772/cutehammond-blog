import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/utils/error";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/auth/types";
import { register } from "@/utils/auth/user";
import { AuthErrors } from "@/utils/auth/error";

// 프로덕션 환경인지 확인한다.
const production = process.env.NODE_ENV == "production";

export async function POST(request: NextRequest) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 500,
      error: "Internal Server Error",
      reason: AuthErrors.JWT_SECRET_NOT_FOUND,
    });
  }

  const { id, pwd } = (await request.json()) as RegisterDTO;

  if (!id || !pwd) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 400,
      error: "Bad Request",
      reason: AuthErrors.INVALID_ID_PASSWORD,
    });
  }

  // 회원가입을 진행한다.
  const registration = await register(id, pwd);

  if (!registration.valid) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 500,
      error: "Internal Server Error",
      reason: [...registration.reasons],
    });
  }

  const response = NextResponse.json({ message: "Successfully Registered." });

  /**
   * 개발 환경에서는 Secure Option을 비활성화한다.
   * localhost의 경우 https가 아닌 http로 동작하기 때문이다.
   */
  response.cookies.set({
    name: ACCESS_TOKEN,
    value: registration.accessToken,
    httpOnly: true,
    secure: production,
  });

  response.cookies.set({
    name: REFRESH_TOKEN,
    value: registration.refreshToken,
    httpOnly: true,
    secure: production,
  });

  return response;
}

export interface RegisterDTO {
  id?: string;
  pwd?: string;
}

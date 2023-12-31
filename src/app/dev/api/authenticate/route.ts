import { NextRequest, NextResponse } from "next/server";

import ErrorResponse from "@/utils/error";
import { AuthErrors } from "@/utils/auth/error";
import { authenticate } from "@/utils/auth/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/auth/types";

// 프로덕션 환경인지 확인한다.
const production = process.env.NODE_ENV == "production";

export async function POST(request: NextRequest) {
  const { id, pwd } = (await request.json()) as AuthenticationDTO;

  if (!id || !pwd) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 400,
      error: "Bad Request",
      reason: AuthErrors.INVALID_ID_PASSWORD,
    });
  }

  const authentication = await authenticate(id, pwd, request);

  if (!authentication.valid) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 401,
      error: "Unauthorized",
      reason: [...authentication.reasons],
    });
  }

  const response = NextResponse.json({ message: "Successfully Authorized." });

  /**
   * 개발 환경에서는 Secure Option을 비활성화한다.
   * localhost의 경우 https가 아닌 http로 동작하기 때문이다.
   */
  response.cookies.set({
    name: ACCESS_TOKEN,
    value: authentication.accessToken,
    httpOnly: true,
    secure: production,
  });

  response.cookies.set({
    name: REFRESH_TOKEN,
    value: authentication.refreshToken,
    httpOnly: true,
    secure: production,
  });

  return response;
}

export interface AuthenticationDTO {
  id?: string;
  pwd?: string;
}

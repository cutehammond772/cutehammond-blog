import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "@/utils/error";
import { renew, validateToken, validateUser } from "@/utils/auth/token";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/auth/types";
import { AuthErrors } from "@/utils/auth/error";

// 현재 프로덕션 상태인지 확인
const production = process.env.NODE_ENV == "production";

// 권한이 필요할 때 자동으로 검증 및 재발급을 수행한다.
export async function middleware(
  request: NextRequest,
  response: NextResponse
): Promise<[boolean, NextResponse]> {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  // JWT 검증에 필요한 Secret Key이다.
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return [
      false,
      ErrorResponse({
        pathname,
        status: 500,
        error: "Internal Server Error",
        reason: [AuthErrors.JWT_SECRET_NOT_FOUND],
      }),
    ];
  }

  // Access Token을 통해 사용자 검증을 진행한다.
  const userValidation = await validateUser(request);

  // Access Token이 존재하지 않는 경우는 제외한다.
  if (
    !userValidation.valid &&
    !userValidation.reasons.includes("INVALID_ACCESS_TOKEN")
  ) {
    return [
      false,
      ErrorResponse({
        pathname,
        status: 401,
        error: "Unauthorized",
        reason: [...userValidation.reasons],
      }),
    ];
  }

  /**
   * Http-Only Cookie로 설정된 Refresh Token이다.
   * Access Token이 유효한 경우에는 사용되지 않지만, 재발급 시에는 이 Token도 교체가 같이 진행된다.
   */
  const refreshToken = await validateToken({
    secret,
    token: cookies.get(REFRESH_TOKEN)?.value,
  });

  if (!refreshToken.valid) {
    return [
      false,
      ErrorResponse({
        pathname,
        status: 401,
        error: "Unauthorized",
        reason: [...refreshToken.reasons],
      }),
    ];
  }

  /**
   * Access Token, Refresh Token을 재발급한다.
   */
  const renewal = await renew({
    secret,
    result: refreshToken,
  });

  if (!renewal.valid) {
    return [
      false,
      ErrorResponse({
        pathname,
        status: 500,
        error: "Internal Server Error",
        reason: [...renewal.reasons],
      }),
    ];
  }

  /**
   * Token을 재발급한다.
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

  return [true, response];
}

export function matcher(path: string) {
  return path.includes("/auth/");
}

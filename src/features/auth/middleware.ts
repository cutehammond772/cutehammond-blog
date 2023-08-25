import { NextRequest, NextResponse } from "next/server";
import ErrorResponse from "../error";
import { checkIntegrity, validateToken } from "./utils/validation";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./utils/type";
import { renew } from "./utils/token";

// 현재 프로덕션 상태인지 확인
const production = process.env.NODE_ENV == "production";

// 권한이 필요할 때 자동으로 검증 및 재발급을 수행한다.
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  /**
   * JWT 검증에 필요한 Secret Key이다.
   */
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return ErrorResponse({
      pathname,
      status: 500,
      error: "Internal Server Error",
      reason: "JWT secret key is not defined.",
    });
  }

  /**
   * Http-Only Cookie로 설정된 Access Token이다.
   * 명시되지 않거나 유효 기한이 만료된 경우, Refresh Token을 이용하여 재발급을 진행한다.
   */
  const accessToken = await validateToken({
    secret,
    token: cookies.get(ACCESS_TOKEN)?.value,
  });

  if (accessToken.valid) {
    return NextResponse.next();
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
    return ErrorResponse({
      pathname,
      status: 401,
      error: "Unauthorized",
      reason: "This user is not authorized.",
    });
  }

  if (await checkIntegrity(refreshToken.payload)) {
    return ErrorResponse({
      pathname,
      status: 401,
      error: "Unauthorized",
      reason:
        "Intregrity check failed; The refresh token in client does not equal to that in server.",
    });
  }

  /**
   * Access Token, Refresh Token을 재발급한다.
   */
  const renewal = await renew({
    secret,
    id: refreshToken.payload.aud as string,
  });

  if (!renewal) {
    return ErrorResponse({
      pathname,
      status: 500,
      error: "Internal Server Error",
      reason: "Token cannot renew for some reason.",
    });
  }

  const response = NextResponse.next();

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

  return response;
}

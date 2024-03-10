import { NextRequest, NextResponse } from "next/server";
import validate from "@/actions/auth/validate";
import { REFRESH_TOKEN } from "@/utils/auth/types";
import InvalidSecretError from "@/utils/auth/errors/InvalidSecretError";
import { validateToken } from "@/utils/auth/token";
import renew from "@/actions/auth/renew";

// 권한이 필요할 때 자동으로 검증 및 재발급을 수행
export async function middleware(request: NextRequest, response: NextResponse) {
  const cookies = request.cookies;

  // JWT 검증에 필요한 Secret Key이다.
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new InvalidSecretError(503);

  // Access Token을 통해 사용자 검증을 진행한다.
  const id = await validate();

  /**
   * Http-Only Cookie로 설정된 Refresh Token이다.
   * Access Token이 유효한 경우에는 사용되지 않지만, 재발급 시에는 이 Token도 교체가 같이 진행된다.
   */
  const { token } = await validateToken({
    secret,
    token: cookies.get(REFRESH_TOKEN)?.value,
  });

  /**
   * Access Token, Refresh Token을 재발급
   */
  await renew({ oldRefreshToken: token });

  return response;
}

export function matcher(path: string) {
  return path.includes("/auth/");
}

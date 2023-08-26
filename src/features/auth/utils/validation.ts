import { NextRequest } from "next/server";
import { JWTPayload, jwtVerify } from "jose";
import { kv } from "@vercel/kv";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXP,
  AuthToken,
  InvalidResult,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXP,
  TokenRenewalResult,
  TOKEN_ISSUER,
  TokenValidResult,
  ValidResult,
  Invalid,
} from "./types";
import { exists } from "./user";
import { createToken } from "./creation";

// Refresh Token의 무결성을 검증한다. (서버에 저장된 토큰과 비교한다.)
export async function checkIntegrity(
  result: TokenValidResult
): Promise<ValidResult | InvalidResult> {
  const id = getId(result.payload);
  const name = result.payload.sub;

  if (name !== REFRESH_TOKEN) {
    return Invalid("INTEGRITY_CHECK_FAILED", "NOT_REFRESH_TOKEN");
  }

  if (!id) {
    return Invalid("INTEGRITY_CHECK_FAILED", "INVALID_AUDIENCE");
  }

  if (result.token !== (await kv.hget<string>(`user:${id}`, REFRESH_TOKEN))) {
    return Invalid("INTEGRITY_CHECK_FAILED", "REFRESH_TOKEN_DIFFERS");
  }

  return { valid: true };
}

// JWT Token이 유효한지 검증한다.
export async function validateToken({
  secret,
  token,
}: {
  secret: string;
  token: AuthToken;
}): Promise<TokenValidResult | InvalidResult> {
  if (!token) {
    return Invalid("TOKEN_VALIDATION_FAILED", "TOKEN_NOT_FOUND");
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { issuer: TOKEN_ISSUER }
    );

    return { valid: true, payload, token };
  } catch (err) {
    return Invalid("TOKEN_VALIDATION_FAILED", "TOKEN_VERIFY_FAILED");
  }
}

// 유효한 사용자인지 확인한다. (= 로그인 상태인지 확인한다.)
export async function validateUser({
  cookies,
}: NextRequest): Promise<ValidResult | InvalidResult> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return Invalid("USER_VALIDATION_FAILED", "JWT_SECRET_NOT_FOUND");
  }

  /**
   * Http-Only Cookie로 설정된 Access Token이다.
   */
  const validation = await validateToken({
    secret,
    token: cookies.get(ACCESS_TOKEN)?.value,
  });

  if (!validation.valid) {
    return Invalid(
      "USER_VALIDATION_FAILED",
      "INVALID_ACCESS_TOKEN",
      ...validation.reasons
    );
  }

  const id = getId(validation.payload);

  if (!id) {
    return Invalid("USER_VALIDATION_FAILED", "INVALID_AUDIENCE");
  }

  if (!(await exists(id))) {
    return Invalid("USER_VALIDATION_FAILED", "USER_NOT_FOUND");
  }

  return { valid: true };
}

// Access Token과 Refresh Token을 (재)발급한다.
export async function renew({
  secret,
  result,
}: {
  secret: string;
  result: TokenValidResult;
}): Promise<TokenRenewalResult | InvalidResult> {
  // Refresh Token의 무결성 검증을 진행한다.
  const validation = await checkIntegrity(result);

  if (!validation.valid) {
    return Invalid("RENEW_FAILED", ...validation.reasons);
  }

  // 무결성 검증이 끝났으므로 유효한 ID이다.
  const id = getId(result.payload)!;

  const accessToken = await createToken(secret, { id, exp: ACCESS_TOKEN_EXP });
  const refreshToken = await createToken(secret, {
    id,
    exp: REFRESH_TOKEN_EXP,
  });

  if (!accessToken || !refreshToken) {
    return Invalid("RENEW_FAILED", "TOKEN_CREATION_FAILED");
  }

  // Refresh Token을 재설정한다. (-> Rotation)
  await kv.hset(`user:${id}`, { [REFRESH_TOKEN]: refreshToken });

  return { valid: true, accessToken, refreshToken };
}

export function getId(payload: JWTPayload) {
  const id = payload.aud;
  return id && typeof id == "string" ? id : null;
}

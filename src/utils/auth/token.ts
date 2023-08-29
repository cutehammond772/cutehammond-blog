import { NextRequest } from "next/server";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
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
  TokenProfile,
  UserValidationResult,
} from "./types";
import { exists } from "./user";

/**
 * 특정 프로파일에 따라 JWT Token을 생성한다.
 */
export async function createToken(
  secret: string,
  profile: TokenProfile
): Promise<AuthToken> {
  const { id, exp, ...other } = profile;

  try {
    return new SignJWT({ ...other })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(REFRESH_TOKEN)
      .setIssuer(TOKEN_ISSUER)
      .setAudience(id)
      .setIssuedAt()
      .setExpirationTime(Date.now() / 1000 + exp)
      .sign(new TextEncoder().encode(secret));
  } catch (err) {
    return null;
  }
}

/**
 * Refresh Token의 무결성을 검증한다. (= 서버에 저장된 토큰과 비교한다.)
 */
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

/**
 * JWT Token이 유효한지 검증한다.
 */
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

/**
 * 유효한 사용자인지 확인한다.
 *
 * 1. 현재 로그인된 상태인지 확인한다.
 * 2. 가입된 사용자인지 확인한다.
 */
export async function validateUser({
  cookies,
}: NextRequest): Promise<UserValidationResult | InvalidResult> {
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

  return { valid: true, id };
}

/**
 * Access Token과 Refresh Token을 재발급한다.
 */
export async function renew({
  secret,
  result,
}: {
  secret: string;
  result: TokenValidResult;
}): Promise<TokenRenewalResult | InvalidResult> {
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
  await kv.hmset(`user:${id}`, { [REFRESH_TOKEN]: refreshToken });

  return { valid: true, accessToken, refreshToken };
}

export function getId(payload: JWTPayload) {
  const id = payload.aud;
  return id && typeof id == "string" ? id : null;
}

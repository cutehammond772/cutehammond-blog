import { JWTPayload, jwtVerify } from "jose";
import { kv } from "@vercel/kv";
import {
  AuthToken,
  REFRESH_TOKEN,
  TOKEN_ISSUER,
  TokenValidationResult,
} from "./type";

// Refresh Token의 무결성을 검증한다. (서버에 저장된 토큰과 비교한다.)
export async function checkIntegrity(payload: JWTPayload) {
  const { aud } = payload;

  if (!aud || typeof aud == "object") {
    return false;
  }

  const storedRefreshToken = await kv.hget<string>(aud, REFRESH_TOKEN);
  return payload.token === storedRefreshToken;
}

// JWT Token이 유효한지 검증한다.
export async function validateToken({
  secret,
  token,
}: {
  secret: string;
  token: AuthToken;
}): Promise<TokenValidationResult> {
  if (!token) {
    return { valid: false, reason: "Token not found." };
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { issuer: TOKEN_ISSUER }
    );

    return { valid: true, payload };
  } catch (err) {
    return { valid: false, reason: "Cannot validate token." };
  }
}

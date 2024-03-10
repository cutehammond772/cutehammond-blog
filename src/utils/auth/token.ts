import { JWTPayload, SignJWT, jwtVerify } from "jose";

import {
  AuthToken,
  REFRESH_TOKEN,
  TOKEN_ISSUER,
  TokenProfile,
} from "@/utils/auth/types";

import TokenCreationError from "./errors/TokenCreationError";
import TokenValidationError from "./errors/TokenValidationError";

/**
 * 특정 프로파일에 따라 Token을 생성한다.
 */
export async function createToken(secret: string, profile: TokenProfile) {
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
    throw new TokenCreationError(503);
  }
}

/**
 * Token이 유효한지 검증한다.
 */
export async function validateToken({
  secret,
  token,
}: {
  secret: string;
  token: AuthToken;
}) {
  if (!token) throw new TokenValidationError(404);

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret),
      { issuer: TOKEN_ISSUER }
    );

    return { payload, token };
  } catch (err) {
    throw new TokenValidationError(503);
  }
}

export function getId(payload: JWTPayload) {
  const id = payload.aud;
  return id && typeof id == "string" ? id : null;
}

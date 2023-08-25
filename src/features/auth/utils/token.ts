import { SignJWT } from "jose";
import { kv } from "@vercel/kv";
import {
  AuthToken,
  REFRESH_TOKEN,
  RenewalResult,
  TOKEN_ISSUER,
  TokenProfile,
} from "./type";

// Access Token과 Refresh Token을 (재)발급한다.
export async function renew({
  secret,
  id,
}: {
  secret: string;
  id: string;
}): Promise<RenewalResult | null> {
  const accessToken = await createToken(secret, { id, expiration: 3600 });
  const refreshToken = await createToken(secret, {
    id,
    expiration: 3600 * 24 * 3,
  });

  if (!accessToken || !refreshToken) {
    return null;
  }

  // Refresh Token을 재설정한다. (-> Rotation)
  await kv.hset(id, { refresh_token: refreshToken });

  return { accessToken, refreshToken };
}

async function createToken(
  secret: string,
  profile: TokenProfile
): Promise<AuthToken> {
  const { id, expiration, ...other } = profile;

  try {
    return new SignJWT({ ...other })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(REFRESH_TOKEN)
      .setIssuer(TOKEN_ISSUER)
      .setAudience(id)
      .setIssuedAt()
      .setExpirationTime(Date.now() / 1000 + expiration)
      .sign(new TextEncoder().encode(secret));
  } catch (err) {
    return null;
  }
}

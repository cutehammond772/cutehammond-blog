import { SignJWT } from "jose";
import { AuthToken, REFRESH_TOKEN, TOKEN_ISSUER, TokenProfile } from "./types";

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

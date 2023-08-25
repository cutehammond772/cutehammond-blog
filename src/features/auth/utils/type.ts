import { JWTPayload } from "jose";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const TOKEN_ISSUER = "cutehammond.dev";

export type TokenProfile = {
  // 사용자의 id를 나타냅니다.
  id: string;

  // 만료 기한을 나타냅니다. (1초 단위)
  expiration: number;

  // 기타 프로파일을 나타냅니다.
  [key: string]: unknown;
};

export interface RenewalResult {
  accessToken: NonNullable<AuthToken>;
  refreshToken: NonNullable<AuthToken>;
}

export type AuthToken = string | null | undefined;

export interface ValidResult {
  readonly valid: true;
  readonly payload: JWTPayload;
}

export interface InvalidResult {
  readonly valid: false;
  readonly reason: string;
}

export type TokenValidationResult = ValidResult | InvalidResult;

// Token
export const ACCESS_TOKEN = "access_token";
export const ACCESS_TOKEN_EXP = 3600;

export const REFRESH_TOKEN = "refresh_token";
export const REFRESH_TOKEN_EXP = 3600 * 24 * 3;

export const TOKEN_ISSUER = "cutehammond.dev";

// Encryption
export const SALT_KEY = "pwd_salt";
export const PASSWORD_KEY = "pwd";

export const SALT_ROUNDS = 1024;
export const SALT_LENGTH = 64;

export type AuthToken = string | null | undefined;

export type TokenProfile = {
  // 사용자의 id를 나타냅니다.
  id: string;

  // 만료 기한을 나타냅니다. (1초 단위)
  exp: number;

  // 기타 프로파일을 나타냅니다.
  [key: string]: unknown;
};

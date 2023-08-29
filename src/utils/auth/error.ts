export const AuthErrors = {
  JWT_SECRET_NOT_FOUND: "JWT_SECRET_NOT_FOUND",

  // VALIDATION
  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  NOT_REFRESH_TOKEN: "NOT_REFRESH_TOKEN",
  INVALID_AUDIENCE: "INVALID_AUDIENCE",
  INTEGRITY_CHECK_FAILED: "INTEGRITY_CHECK_FAILED",
  REFRESH_TOKEN_DIFFERS: "REFRESH_TOKEN_DIFFERS",
  TOKEN_VALIDATION_FAILED: "TOKEN_VALIDATION_FAILED",
  USER_VALIDATION_FAILED: "USER_VALIDATION_FAILED",
  TOKEN_NOT_FOUND: "TOKEN_NOT_FOUND",
  TOKEN_VERIFY_FAILED: "TOKEN_VERIFY_FAILED",
  USER_NOT_FOUND: "USER_NOT_FOUND",
  RENEW_FAILED: "RENEW_FAILED",
  TOKEN_CREATION_FAILED: "TOKEN_CREATION_FAILED",

  // ENCRYPTION
  PASSWORD_ENCRYPTION_FAILED: "PASSWORD_ENCRYPTION_FAILED",
  SALT_CREATION_FAILED: "SALT_CREATION_FAILED",
  PAIR_CREATION_FAILED: "PAIR_CREATION_FAILED",

  // USER
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  REGISTER_FAILED: "REGISTER_FAILED",
  AUTHENTICATION_FAILED: "AUTHENTICATION_FAILED",
  USER_ALREADY_AUTHORIZED: "USER_ALREADY_AUTHORIZED",
  STORED_PASSWORD_CORRUPTED: "STORED_PASSWORD_CORRUPTED",
  PASSWORD_DOES_NOT_MATCH: "PASSWORD_DOES_NOT_MATCH",
  LOGOUT_FAILED: "LOGOUT_FAILED",
  USER_NOT_AUTHORIZED: "USER_NOT_AUTHORIZED",

  // REQUEST
  INVALID_ID_PASSWORD: "INVALID_ID_PASSWORD",
} as const;
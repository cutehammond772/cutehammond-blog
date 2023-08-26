import { NextRequest } from "next/server";
import { kv } from "@vercel/kv";

import {
  ACCESS_TOKEN_EXP,
  InvalidResult,
  PASSWORD_KEY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXP,
  TokenRenewalResult,
  SALT_KEY,
  Invalid,
} from "./types";
import { createToken } from "./creation";
import { createEncryptionPair, encrypt } from "./encryption";
import { validateUser } from "./validation";

// 해당 ID를 가진 계정이 존재하는지 확인한다.
export async function exists(id: string) {
  return (await kv.exists(`user:${id}`)) > 0;
}

// 회원 가입을 진행한다.
export async function register(
  id: string,
  pwd: string
): Promise<TokenRenewalResult | InvalidResult> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return Invalid("REGISTER_FAILED", "JWT_SECRET_NOT_FOUND");
  }

  // 이미 동일한 ID의 유저가 존재하는지 확인한다.
  if (await exists(id)) {
    return Invalid("REGISTER_FAILED", "USER_ALREADY_EXISTS");
  }

  // 비밀번호를 암호화한다.
  const pair = await createEncryptionPair(pwd);

  if (!pair.valid) {
    return Invalid("REGISTER_FAILED", ...pair.reasons);
  }

  // JWT Token을 생성한다.
  const accessToken = await createToken(secret, { id, exp: ACCESS_TOKEN_EXP });
  const refreshToken = await createToken(secret, {
    id,
    exp: REFRESH_TOKEN_EXP,
  });

  if (!accessToken || !refreshToken) {
    return Invalid("RENEW_FAILED", "TOKEN_CREATION_FAILED");
  }

  // 사용자를 등록한다.
  const result = await kv.hmset(`user:${id}`, {
    [REFRESH_TOKEN]: refreshToken,
    [SALT_KEY]: pair.salt,
    [PASSWORD_KEY]: pair.pwd,
  });

  if (result !== "OK") {
    return Invalid("RENEW_FAILED", "STORE_FAILED");
  }

  return { valid: true, accessToken, refreshToken };
}

// 로그인을 수행한다.
export async function authenticate(
  id: string,
  pwd: string,
  request: NextRequest
): Promise<TokenRenewalResult | InvalidResult> {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return Invalid("AUTHENTICATION_FAILED", "JWT_SECRET_NOT_FOUND");
  }

  // 현재 사용자가 로그인 상태인지 확인한다.
  const userCheck = await validateUser(request);

  if (userCheck.valid) {
    return Invalid("AUTHENTICATION_FAILED", "USER_ALREADY_AUTHORIZED");
  }

  // 가입된 사용자가 존재하는지 확인한다.
  if (!(await exists(id))) {
    return Invalid("AUTHENTICATION_FAILED", "USER_NOT_FOUND");
  }

  const salt = await kv.hget<string>(`user:${id}`, SALT_KEY);
  const storedpwd = await kv.hget<string>(`user:${id}`, PASSWORD_KEY);

  if (!salt || !storedpwd) {
    return Invalid("AUTHENTICATION_FAILED", "STORED_PASSWORD_CORRUPTED");
  }

  // 비밀번호를 비교한다.
  const comparison = await encrypt(salt, pwd);

  if (!comparison.valid) {
    return Invalid("AUTHENTICATION_FAILED", ...comparison.reasons);
  }

  if (comparison.pwd !== storedpwd) {
    return Invalid("AUTHENTICATION_FAILED", "PASSWORD_DOES_NOT_MATCH");
  }

  // 새로운 Token을 등록한다.
  const accessToken = await createToken(secret, { id, exp: ACCESS_TOKEN_EXP });
  const refreshToken = await createToken(secret, {
    id,
    exp: REFRESH_TOKEN_EXP,
  });

  if (!accessToken || !refreshToken) {
    return Invalid("AUTHENTICATION_FAILED", "TOKEN_CREATION_FAILED");
  }

  const result = await kv.hmset(`user:${id}`, {
    [REFRESH_TOKEN]: refreshToken,
  });

  if (result !== "OK") {
    return Invalid("AUTHENTICATION_FAILED", "RENEW_FAILED");
  }

  return { valid: true, accessToken, refreshToken };
}

export async function logout(request: NextRequest) {}

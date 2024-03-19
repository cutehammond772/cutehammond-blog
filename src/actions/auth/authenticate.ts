"use server";

import { cookies } from "next/headers";
import { exists, get, set } from "@/utils/db";

import validate from "./validate";

import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXP,
  PASSWORD_KEY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXP,
  SALT_KEY,
} from "@/utils/auth";

import { ServerResponse } from "@/utils/server";
import { encrypt } from "@/utils/auth/encryption";
import { createToken } from "@/utils/auth/token";

import {
  AuthenticationError,
  HTTPError,
  InvalidSecretError,
  UserAlreadyAuthenticatedError,
  UserNotFoundError,
} from "@/utils/auth/error";

const production = process.env.NODE_ENV == "production";

/**
 * 개발자 인증을 수행한다.
 */
export default async function authenticate({
  id,
  pwd,
}: {
  id: string;
  pwd: string;
}): Promise<ServerResponse> {
  try {
    const secret = process.env.JWT_SECRET;

    // JWT Secret 유효성 확인
    if (!secret) throw new InvalidSecretError(503);

    // 현재 사용자가 로그인 상태인지 확인
    if (await validate()) throw new UserAlreadyAuthenticatedError(400);

    // 가입된 사용자가 존재하는지 확인
    if (!(await exists(id))) throw new UserNotFoundError(404);

    const salt = await get(`user:${id}`, SALT_KEY);
    const storedpwd = await get(`user:${id}`, PASSWORD_KEY);

    if (!salt || !storedpwd) throw new AuthenticationError(503);

    // 비밀번호 비교
    const encryptedPwd = await encrypt(salt, pwd);

    if (encryptedPwd !== storedpwd) throw new AuthenticationError(400);

    // 새로운 Token을 등록
    const accessToken = await createToken(secret, {
      id,
      exp: ACCESS_TOKEN_EXP,
    });
    const refreshToken = await createToken(secret, {
      id,
      exp: REFRESH_TOKEN_EXP,
    });

    // Refresh Token Rotation
    await set(`user:${id}`, { [REFRESH_TOKEN]: refreshToken });

    // Cookie에 새로운 Token을 등록

    /**
     * 개발 환경에서는 Secure Option을 비활성화한다.
     * localhost의 경우 https가 아닌 http로 동작하기 때문이다.
     */
    const cookie = cookies();

    cookie.set({
      name: ACCESS_TOKEN,
      value: accessToken,
      httpOnly: true,
      secure: production,
    });

    cookie.set({
      name: REFRESH_TOKEN,
      value: refreshToken,
      httpOnly: true,
      secure: production,
    });

    return { error: false };
  } catch (e) {
    if (e instanceof HTTPError) {
      return { error: e.name, httpCode: e.httpCode };
    }

    return { error: "UNKNOWN" };
  }
}

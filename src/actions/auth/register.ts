"use server";

import { cookies } from "next/headers";
import { exists, set } from "@/utils/db";

import InvalidSecretError from "@/utils/auth/errors/InvalidSecretError";
import ProductionModeProhibitedError from "@/utils/auth/errors/ProductionModeProhibitedError";
import UserAlreadyRegisteredError from "@/utils/auth/errors/UserAlreadyRegisteredError";

import { createToken } from "@/utils/auth/token";
import { createEncryptionPair } from "@/utils/auth/encryption";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXP,
  PASSWORD_KEY,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXP,
  SALT_KEY,
} from "@/utils/auth/types";
import HTTPError from "@/utils/auth/errors/HTTPError";
import { ServerResponse } from "@/utils/error";

const production = process.env.NODE_ENV == "production";

/**
 * 관리자를 등록합니다. 단, 등록은 개발 환경에서만 가능합니다.
 */
export default async function register({
  id,
  pwd,
}: {
  id: string;
  pwd: string;
}): Promise<ServerResponse> {
  try {
    // 프로덕션 환경이 아니어야 함
    if (production) throw new ProductionModeProhibitedError(401);

    const secret = process.env.JWT_SECRET;

    // JWT Secret 유효성 확인
    if (!secret) throw new InvalidSecretError(503);

    // 이미 등록된 관리자인지 확인
    if (await exists(`user:${id}`)) throw new UserAlreadyRegisteredError(400);

    // 비밀번호 암호화
    const { salt, pwd: encryptedPwd } = await createEncryptionPair(pwd);

    // JWT Token 생성
    const accessToken = await createToken(secret, {
      id,
      exp: ACCESS_TOKEN_EXP,
    });
    const refreshToken = await createToken(secret, {
      id,
      exp: REFRESH_TOKEN_EXP,
    });

    // 관리자 등록
    await set(`user:${id}`, {
      [REFRESH_TOKEN]: refreshToken,
      [SALT_KEY]: salt,
      [PASSWORD_KEY]: encryptedPwd,
    });

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

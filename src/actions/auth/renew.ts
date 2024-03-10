"use server";

import { cookies } from "next/headers";
import { exists, get, set } from "@/utils/db";

import { createToken, getId, validateToken } from "@/utils/auth/token";
import {
  ACCESS_TOKEN,
  ACCESS_TOKEN_EXP,
  REFRESH_TOKEN,
  REFRESH_TOKEN_EXP,
} from "@/utils/auth/types";

import InvalidSecretError from "@/utils/auth/errors/InvalidSecretError";
import InvalidUserError from "@/utils/auth/errors/InvalidUserError";
import InvalidTokenError from "@/utils/auth/errors/InvalidTokenError";
import { ServerResponse } from "@/utils/error";
import HTTPError from "@/utils/auth/errors/HTTPError";

const production = process.env.NODE_ENV == "production";

/**
 * 기존 Refresh Token을 이용하여 Access Token과 Refresh Token을 재발급한다.
 */
export default async function renew({
  oldRefreshToken,
}: {
  oldRefreshToken: string;
}): Promise<ServerResponse> {
  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) throw new InvalidSecretError(503);

    const validation = await validateToken({ secret, token: oldRefreshToken });

    const id = getId(validation.payload);
    const name = validation.payload.sub;

    if (!id || (id && !(await exists(id)))) throw new InvalidUserError(400);

    if (
      name !== REFRESH_TOKEN ||
      validation.token !== (await get(`user:${id}`, REFRESH_TOKEN))
    )
      throw new InvalidTokenError(400);

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

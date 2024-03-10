"use server";

import HTTPError from "@/utils/auth/errors/HTTPError";
import InvalidSecretError from "@/utils/auth/errors/InvalidSecretError";
import InvalidUserError from "@/utils/auth/errors/InvalidUserError";
import { getId, validateToken } from "@/utils/auth/token";
import { ACCESS_TOKEN } from "@/utils/auth/types";
import { exists } from "@/utils/db";
import { ServerResponseWithPayload } from "@/utils/error";
import { cookies } from "next/headers";

export default async function validate(): Promise<
  ServerResponseWithPayload<string | null>
> {
  try {
    const secret = process.env.JWT_SECRET;

    // JWT Secret 유효성 확인
    if (!secret) throw new InvalidSecretError(503);

    const cookie = cookies();

    /**
     * Http-Only Cookie로 설정된 Access Token이다.
     */
    const validation = await validateToken({
      secret,
      token: cookie.get(ACCESS_TOKEN)?.value,
    });

    const id = getId(validation.payload);

    if (id && !(await exists(id))) throw new InvalidUserError(400);

    return { error: false, payload: id };
  } catch (e) {
    if (e instanceof HTTPError) {
      return { error: e.name, httpCode: e.httpCode };
    }

    return { error: "UNKNOWN" };
  }
}

"use server";

import { InvalidSecretError, InvalidUserError } from "@/utils/auth/error";
import { getId, validateToken } from "@/utils/auth/token";
import { ACCESS_TOKEN } from "@/utils/auth";
import { exists } from "@/utils/db";
import { cookies } from "next/headers";
import { actionHandler } from "@/utils/server";

async function validate() {
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

  if (!id || (id && !(await exists(id)))) throw new InvalidUserError(400);

  return id;
}

export default actionHandler(validate);

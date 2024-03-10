"use server";

import { cookies } from "next/headers";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/auth/types";

import UserNotAuthenticatedError from "@/utils/auth/errors/UserNotAuthenticatedError";
import HTTPError from "@/utils/auth/errors/HTTPError";
import { ServerResponse } from "@/utils/error";
import validate from "./validate";

export default async function logout(): Promise<ServerResponse> {
  try {
    const validation = await validate();

    // 관리자가 인증 된 상태가 아니면 로그아웃을 할 수 없다.
    if (validation.error) throw new UserNotAuthenticatedError(400);

    // Token을 삭제한다.
    const cookie = cookies();

    cookie.delete(ACCESS_TOKEN);
    cookie.delete(REFRESH_TOKEN);

    return { error: false };
  } catch (e) {
    if (e instanceof HTTPError) {
      return { error: e.name, httpCode: e.httpCode };
    }

    return { error: "UNKNOWN" };
  }
}

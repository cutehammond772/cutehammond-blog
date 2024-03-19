"use server";

import { cookies } from "next/headers";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/utils/auth";
import { UserNotAuthenticatedError } from "@/utils/auth/error";

import validate from "./validate";
import { actionHandler } from "@/utils/server";

async function logout() {
  const validation = await validate();

  // 관리자가 인증 된 상태가 아니면 로그아웃을 할 수 없다.
  if (validation.error) throw new UserNotAuthenticatedError(400);

  // Token을 삭제한다.
  const cookie = cookies();

  cookie.delete(ACCESS_TOKEN);
  cookie.delete(REFRESH_TOKEN);
}

export default actionHandler(logout);

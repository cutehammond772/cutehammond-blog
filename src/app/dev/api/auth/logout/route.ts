import { NextRequest, NextResponse } from "next/server";
import { logout } from "@/utils/auth/user";
import ErrorResponse from "@/utils/error";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Successfully Logged out." });
  const logoutResult = await logout(request, response);

  if (!logoutResult.valid) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 500,
      error: "Internal Server Error",
      reason: [...logoutResult.reasons],
    });
  }

  return response;
}

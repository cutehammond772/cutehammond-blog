import { validateUser } from "@/utils/auth/token";
import ErrorResponse from "@/utils/error";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userValidation = await validateUser(request);

  // Middleware의 검증 과정과 겹친다.
  if (!userValidation.valid) {
    return ErrorResponse({
      pathname: request.nextUrl.pathname,
      status: 401,
      error: "Unauthorized",
      reason: [...userValidation.reasons],
    });
  }

  return NextResponse.json({ id: userValidation.id });
}

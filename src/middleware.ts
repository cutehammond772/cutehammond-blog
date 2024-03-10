import { NextRequest, NextResponse } from "next/server";
import { dev, auth } from "@/middlewares";

const middlewares = [dev, auth];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let next = true;
  let response = NextResponse.next();

  for (const { matcher, middleware } of middlewares) {
    if (!matcher(pathname)) continue;
    response = await middleware(request, response);

    if (!next) return response;
  }

  return response;
}

import { list } from "@/utils/article/github";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { articles } = await list({});
  return NextResponse.json(articles);
}

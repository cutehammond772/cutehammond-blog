import { NextResponse } from "next/server";
import { list } from "@/utils/article/github";

export async function GET() {
  const titles = await list({ draft: true });
  return NextResponse.json(titles);
}

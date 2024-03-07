import { NextRequest, NextResponse } from "next/server";
import { load } from "@/utils/article/github";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const content = await load({ title: params.slug });
  return NextResponse.json(content);
}

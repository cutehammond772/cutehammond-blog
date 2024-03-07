import { NextResponse } from "next/server";
import { load } from "@/utils/article/github";

export async function GET({ params }: { params: { slug: string } }) {
  const content = await load({ title: params.slug });
  return NextResponse.json(content);
}

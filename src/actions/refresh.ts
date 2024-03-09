"use server";

import { revalidatePath } from "next/cache";

export type RefreshRequest =
  | { type: "all" }
  | { type: "page"; title?: string }
  | { type: "index" };

export default async function refresh(request: RefreshRequest) {
  if (request.type == "all") revalidatePath("/", "layout");
  if (request.type == "page")
    revalidatePath(
      `/articles/${request.title ?? "[slug]"}`,
      request.title ? "page" : "layout"
    );
  if (request.type == "index") revalidatePath("/", "page");
}

"use server";

import { revalidateTag } from "next/cache";
import { source as github } from "@/utils/article/github";

export type RefreshRequest =
  /* 모든 Article 정보를 갱신합니다. */
  | { type: "all" }

  /* 특정 Source의 Article 목록을 갱신합니다. Source를 명시하지 않는 경우 모든 Source가 대상입니다. */
  | { type: "list"; source?: string }

  /* 특정 Source의 Article을 갱신합니다. Source를 명시하지 않는 경우 모든 Source가 대상이며,
   title을 명시하지 않는 경우 특정 Source 내 모든 Article이 대상입니다. */
  | { type: "article"; source?: string; title?: string };

// TODO: Github 이외에도 추가 예정
const sources = [github];

export default async function refresh(request: RefreshRequest) {
  if (request.type === "all") {
    sources.forEach(({ LIST_TAG, ARTICLE_GROUP }) =>
      revalidateTags(LIST_TAG, ARTICLE_GROUP)
    );
  } else if (request.type === "list") {
    sources
      .filter(
        ({ ARTICLE_SOURCE }) =>
          !request.source || request.source === ARTICLE_SOURCE
      )
      .forEach(({ LIST_TAG }) => revalidateTags(LIST_TAG));
  } else if (request.type == "article") {
    sources
      .filter(
        ({ ARTICLE_SOURCE }) =>
          !request.source || request.source === ARTICLE_SOURCE
      )
      .map(({ ARTICLE_GROUP, ARTICLE_TAG }) =>
        request.title ? ARTICLE_TAG(request.title) : ARTICLE_GROUP
      )
      .forEach(revalidateTag);
  }
}

function revalidateTags(...tags: string[]) {
  tags.forEach(revalidateTag);
}

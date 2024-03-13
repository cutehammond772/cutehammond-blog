"use client";

import { useCallback } from "react";
import { RefreshCw } from "react-feather";

import refresh from "@/actions/article/refresh";

export default function ArticleRefreshOption({ article }: { article: string }) {
  const handler = useCallback(async () => {
    await refresh({ type: "page", title: article });

    location.reload();
  }, [article]);

  return (
    <button
      title="해당 글을 다시 불러오기"
      onClick={handler}
      className="fp-bold grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 bg-beige-300 p-4 text-start dark:bg-charcoal-700"
    >
      <RefreshCw className="row-span-full self-center" />
      <span>해당 글을 다시 불러오기</span>
      <span className="text-text-700 dark:text-text-300">
        수정 사항이 반영되지 않은 경우 해당 글을 다시 불러옵니다.
      </span>
    </button>
  );
}

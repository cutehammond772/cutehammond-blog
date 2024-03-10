"use client";

import { useCallback } from "react";
import { RefreshCw } from "react-feather";

import refresh from "@/actions/article/refresh";

export default function Refresh() {
  const handler = useCallback(async () => {
    await refresh({ type: "all" });

    // index page로 이동합니다.
    window.location.href = "/";
  }, []);

  return (
    <button
      title="글 새로고침"
      onClick={handler}
      className="fp-bold grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 bg-beige-300 p-4 text-start dark:bg-charcoal-700"
    >
      <RefreshCw className="row-span-full self-center" />
      <span>글 새로고침</span>
      <span className="text-text-700 dark:text-text-300">
        Github에 등록된 글을 다시 불러옵니다.
      </span>
    </button>
  );
}

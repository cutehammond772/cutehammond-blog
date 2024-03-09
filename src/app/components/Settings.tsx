"use client";

import useModal from "@/modal/useModal";
import { RefreshCw, X } from "react-feather";

export default function Settings() {
  const { close } = useModal();

  return (
    <div className="mx-auto flex h-screen items-center justify-center">
      <div className="flex h-screen w-screen flex-col gap-4 bg-beige-100 p-4 shadow-xl dark:bg-charcoal-900 md:h-auto md:w-1/2 md:p-8">
        {/* Header Section */}
        <div className="flex flex-row items-center justify-between">
          <span className="f3-bold">설정</span>
          <button title="설정 창 닫기" onClick={close}>
            <X className="f3-bold" />
          </button>
        </div>

        {/* Main Section */}
        <div className="flex flex-grow flex-col justify-center">
          <button
            title="글 새로고침"
            className="fp-bold grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-4 bg-beige-300 p-4 text-start dark:bg-charcoal-700"
          >
            <RefreshCw className="row-span-full self-center" />
            <span>글 새로고침</span>
            <span className="text-text-700 dark:text-text-300">
              Github에 등록된 글을 다시 불러옵니다.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

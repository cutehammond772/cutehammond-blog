"use client";

import useModal from "@/modal/useModal";
import { X } from "react-feather";

import ListRefreshOption from "../option/ListRefreshOption";
import AuthOption from "../option/AuthOption";
import { usePathname } from "next/navigation";
import ArticleRefreshOption from "../option/ArticleRefreshOption";

function isIndexPage(path: string) {
  return path === "/";
}

function isArticlePage(path: string) {
  return path.startsWith("/article/");
}

export default function SettingsModal() {
  const { close } = useModal();

  // 페이지의 위치에 따라 새로 고침의 옵션을 달리한다.
  const currentPath = decodeURI(usePathname());

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
        <div className="flex flex-grow flex-col justify-center gap-4">
          {isIndexPage(currentPath) && <ListRefreshOption />}
          {isArticlePage(currentPath) && (
            <ArticleRefreshOption
              article={currentPath.replace("/article/", "")}
            />
          )}
          <AuthOption />
        </div>
      </div>
    </div>
  );
}

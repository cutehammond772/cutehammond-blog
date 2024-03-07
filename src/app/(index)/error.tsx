"use client";

import { notoSansBold } from "@/styles/fonts/notoSans";

// 홈페이지 자체를 새로고침한다.
function refresh() {
  window.location.href = "/";
}

export default function Error() {
  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center justify-center gap-4">
      <div className={`${notoSansBold.className} text-4xl`}>503</div>
      <div className="text-xl">글을 불러오는 데 실패하였습니다.</div>
      <button className="bg-layer text-layer text-bold p-2" onClick={refresh}>
        다시 시도
      </button>
    </div>
  );
}

"use client";

// 홈페이지 자체를 새로고침한다.
function refresh() {
  window.location.href = "/";
}

export default function Error() {
  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center justify-center gap-4">
      <div className="f1-bold">Error</div>
      <div className="f2-bold">글을 불러오는 데 실패하였습니다.</div>
      <button
        className="fp-regular bg-charcoal-900 px-4 py-2 text-text-100 dark:bg-beige-500 dark:text-text-900"
        onClick={refresh}
      >
        다시 시도
      </button>
    </div>
  );
}

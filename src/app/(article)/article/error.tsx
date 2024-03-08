"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center justify-center gap-4">
      <div className="f1-bold">503</div>
      <div className="f2-bold">페이지를 불러오는 데 실패하였습니다.</div>
      <Link
        href="/"
        className="bg-charcoal-900 dark:bg-beige-500 text-text-100 dark:text-text-900 fp-regular px-4 py-2"
      >
        메인 화면으로
      </Link>
    </div>
  );
}

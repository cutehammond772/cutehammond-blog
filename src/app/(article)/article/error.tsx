"use client";

import { notoSansBold } from "@/styles/fonts/notoSans";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center justify-center gap-4">
      <div className={`${notoSansBold.className} text-4xl`}>503</div>
      <div className="text-xl">페이지를 불러오는 데 실패하였습니다.</div>
      <Link href="/" className="bg-layer text-layer text-bold p-2">
        메인 화면으로
      </Link>
    </div>
  );
}

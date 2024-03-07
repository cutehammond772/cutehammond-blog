import { notoSansBold } from "@/styles/fonts/notoSans";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center justify-center gap-4">
      <div className={`${notoSansBold.className} text-4xl`}>404</div>
      <div className="text-xl">존재하지 않는 페이지입니다.</div>
      <Link href="/" className="bg-layer text-layer text-bold p-2">
        홈으로
      </Link>
    </div>
  );
}

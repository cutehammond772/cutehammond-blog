import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col flex-nowrap items-center justify-center gap-4 text-center">
      <div className="f1-bold break-keep">404</div>
      <div className="f2-bold break-keep">존재하지 않는 페이지입니다.</div>
      <Link
        href="/"
        className="bg-charcoal-900 dark:bg-beige-500 text-text-100 dark:text-text-900 fp-regular px-4 py-2"
      >
        홈으로
      </Link>
    </div>
  );
}

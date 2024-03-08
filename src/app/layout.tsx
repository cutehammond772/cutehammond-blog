import type { Metadata } from "next";
import Link from "next/link";

import { pretendard } from "@/styles/font";
import "@/styles/globals.css";

import BlogContainer from "@/app/BlogContainer";
import ThemePreloadScript from "@/theme/ThemePreloadScript";
import ThemeSelection from "./ThemeSelection";

export const metadata: Metadata = {
  title: "개발하는 햄찌",
  description: "햄찌는 무한한 가능성을 지닙니다.",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogContainer>
      <html lang="ko" suppressHydrationWarning>
        <body
          className={`${pretendard.className} bg-beige-100 dark:bg-charcoal-900 text-text-900 dark:text-text-100 grid min-h-screen grid-cols-[0_1fr_0] grid-rows-[auto_1fr_auto] md:grid-cols-[1fr_3fr_1fr]`}
        >
          <ThemePreloadScript />
          {/* Header Section */}
          <header className="bg-beige-100 dark:bg-charcoal-900 sticky top-0 z-50 col-span-1 col-start-2 flex flex-row items-center justify-between px-4 py-4 md:px-0">
            <Link href="/" className="f3-bold">
              cutehammond.dev
            </Link>
            <ThemeSelection />
          </header>

          {/* Main Section */}
          <main className="col-span-1 col-start-2">{children}</main>

          {/* Footer Section */}
          <footer className="fp-bold col-span-3 mt-24 gap-2 px-8 py-4 text-center">
            Edit by Jungheon Lee
          </footer>
        </body>
      </html>
    </BlogContainer>
  );
}

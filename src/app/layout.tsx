import type { Metadata } from "next";

import "@/styles/globals.css";
import { notoSansMedium } from "@/styles/fonts/notoSans";

import BlogContainer from "@/app/components/BlogContainer";
import ThemePreloadScript from "@/theme/ThemePreloadScript";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "개발하는 햄찌",
  description: "햄찌는 무한한 가능성을 지닙니다.",
};

export default async function Layout({
  children,
  header,
  aside,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <BlogContainer>
      <html lang="ko" suppressHydrationWarning>
        <body
          className={`${notoSansMedium.className} blog-bg grid min-h-screen grid-cols-[1fr_10fr_1fr] grid-rows-[auto_1fr_auto] md:grid-cols-[3fr_6fr_3fr]`}
        >
          <ThemePreloadScript />
          <header className="blog-bg sticky top-0 z-50 col-span-1 col-start-2 py-4">
            {header}
          </header>
          <aside className="col-span-1 col-start-1">{aside}</aside>
          <main className="col-span-1 col-start-2">
            <Suspense fallback={<div>글을 불러오는 중...</div>}>
              {children}
            </Suspense>
          </main>
          <footer className="blog-primary col-span-3 mt-24 flex flex-col items-center justify-between gap-2 px-8 py-4 font-bold md:flex-row">
            <span>2024 Jungheon Lee</span>
            <a href="https://github.com/cutehammond772">🔗 Github</a>
          </footer>
        </body>
      </html>
    </BlogContainer>
  );
}

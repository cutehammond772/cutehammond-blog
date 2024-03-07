import type { Metadata } from "next";
import Link from "next/link";

import "@/styles/globals.css";
import { notoSansMedium } from "@/styles/fonts/notoSans";

import BlogContainer from "@/app/BlogContainer";
import ThemePreloadScript from "@/theme/ThemePreloadScript";
import { interBold } from "@/styles/fonts/inter";
import ThemeSelection from "./ThemeSelection";

export const metadata: Metadata = {
  title: "개발하는 햄찌",
  description: "햄찌는 무한한 가능성을 지닙니다.",
};

export default async function Layout({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside: React.ReactNode;
}) {
  return (
    <BlogContainer>
      <html lang="ko" suppressHydrationWarning>
        <body
          className={`${notoSansMedium.className} bg-default text-default grid min-h-screen grid-cols-[1fr_10fr_1fr] grid-rows-[auto_1fr_auto] xl:grid-cols-[3fr_6fr_3fr]`}
        >
          <ThemePreloadScript />
          {/* Header Section */}
          <header
            className={`${interBold.className} bg-default text-default sticky top-0 z-50 col-span-1 col-start-2 flex flex-col items-center justify-between py-4 md:flex-row`}
          >
            <Link href="/" className="text-xl font-bold">
              cutehammond.dev
            </Link>
            <ThemeSelection />
          </header>

          {/* Aside Section */}
          <aside className="col-span-1 col-start-1">{aside}</aside>

          {/* Main Section */}
          <main className="col-span-1 col-start-2">{children}</main>

          {/* Footer Section */}
          <footer className="bg-layer text-layer col-span-3 mt-24 flex flex-col items-center justify-between gap-2 px-8 py-4 font-bold xl:flex-row">
            <span>Edit by Jungheon Lee</span>
          </footer>
        </body>
      </html>
    </BlogContainer>
  );
}

import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogContainer from "@/components/BlogContainer";

export const metadata: Metadata = {
  title: "개발하는 햄찌",
  description: "햄찌는 무한한 가능성을 지닙니다.",
};

export const themeScript = `(function() {
  let theme = window.localStorage.getItem("blog_theme");

  if (!theme) {
    window.localStorage.setItem("blog_theme", (theme = "system"));
  }

  document.documentElement.dataset.theme = 
  (theme == "system") ? (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light") : theme;
})()`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BlogContainer>
      <html lang="ko" suppressHydrationWarning>
        <body className="flex flex-col cb-bg cb-text min-h-screen">
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <Header className="tablet:px-[20%] sticky top-0" />
          <main className="tablet:mx-[20%] flex-grow">{children}</main>
          <Footer className="tablet:px-[20%] mt-48" />
        </body>
      </html>
    </BlogContainer>
  );
}

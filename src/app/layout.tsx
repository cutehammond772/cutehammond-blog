import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/components/default/Header";
import Footer from "@/components/default/Footer";
import ThemeContainer from "@/features/theme/ThemeContainer";

export const metadata: Metadata = {
  title: "개발하는 햄찌",
  description: "햄찌는 무한한 가능성을 지닙니다.",
};

const script = `(function() {
  let theme = window.localStorage.getItem("theme");

  if (!theme) {
    window.localStorage.setItem("theme", (theme = "system"));
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
    <ThemeContainer>
      <html lang="ko" suppressHydrationWarning>
        <body className="flex flex-col bg-primary">
          <script dangerouslySetInnerHTML={{ __html: script }} />
          <Header className="tablet:px-[20%] sticky top-0" />
          <main className="tablet:mx-[20%]">{children}</main>
          <Footer className="tablet:px-[20%] mt-48" />
        </body>
      </html>
    </ThemeContainer>
  );
}

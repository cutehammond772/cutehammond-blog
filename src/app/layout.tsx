import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "@/components/default/Header";
import Footer from "@/components/default/Footer";
import { interMedium } from "@/styles/fonts/inter";

export const metadata: Metadata = {
  title: "개발하는 햄찌",
  description: "햄찌는 무한한 가능성을 지닙니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${interMedium.className} bg-slate-50`}>
      <body className="flex flex-col">
        <Header className="md:px-[20%] sticky top-0" />
        <main className="md:mx-[20%]">{children}</main>
        <Footer className="md:px-[20%] mt-48" />
      </body>
    </html>
  );
}

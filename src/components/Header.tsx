import Image from "next/image";
import Logo from "/public/logo.svg";

import { interBold } from "@/styles/fonts/inter";
import { notoSansBold } from "@/styles/fonts/notoSans";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export type HeaderScheme = { className: string };

export default function Header({ className }: HeaderScheme) {
  return (
    <header
      className={`${className} ${interBold.className} blog-lv0 z-50 grid grid-cols-[auto_1fr_auto] items-center px-4 sm:px-8 md:px-0 py-4`}
    >
      <Link href="/" className="flex flex-nowrap items-center gap-2">
        <Image src={Logo} alt="Logo" width={24} height={24} />
        <p>cutehammond.dev</p>
      </Link>

      <nav className={`${notoSansBold.className} hidden desktop:block`}>
        <ul className="flex flex-nowrap justify-center gap-x-8">
          <li>
            <a href="#">알고리즘</a>
          </li>
          <li>
            <a href="#">프론트엔드</a>
          </li>
          <li>
            <a href="#">프로파일</a>
          </li>
        </ul>
      </nav>

      <ThemeToggle />
    </header>
  );
}

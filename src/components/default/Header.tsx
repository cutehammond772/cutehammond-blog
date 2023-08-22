import Image from "next/image";
import Logo from "/public/logo.svg";

import { interBold } from "@/styles/fonts/inter";
import { notoSansBold } from "@/styles/fonts/notoSans";
import Link from "next/link";

export type HeaderScheme = { className: string };

export default function Header({ className }: HeaderScheme) {
  return (
    <header
      className={`${className} ${interBold.className} bg-primary z-50 flex flex-nowrap justify-between items-center px-4 sm:px-8 md:px-0 py-4 text-xl`}
    >
      <Link href="/" className="flex flex-nowrap items-center gap-2">
        <Image src={Logo} alt="Logo" width={24} height={24} />
        <h1 className="text-primary">cutehammond.dev</h1>
      </Link>

      <nav
        className={`${notoSansBold.className} text-neutral-600 hidden desktop:block`}
      >
        <ul className="flex flex-nowrap gap-x-8 text-sm">
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
    </header>
  );
}

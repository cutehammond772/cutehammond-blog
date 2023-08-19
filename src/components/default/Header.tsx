import Image from "next/image";
import Logo from "/public/logo.svg";

import { interBold } from "@/styles/fonts/inter";
import { notoSansBold } from "@/styles/fonts/notoSans";
import Link from "next/link";

export type HeaderScheme = { className: string };

export default function Header({ className }: HeaderScheme) {
  return (
    <header
      className={`${className} ${interBold.className} z-50 flex flex-nowrap justify-between items-center px-4 sm:px-8 md:px-0 py-4 text-xl bg-slate-50 drop-shadow-md`}
    >
      <Link href="/" className="flex flex-nowrap items-center gap-2">
        <Image src={Logo} alt="Logo" width={32} height={32} />
        <h1>cutehammond.dev</h1>
      </Link>

      <nav
        className={`${notoSansBold.className} text-neutral-600 hidden xl:block`}
      >
        <ul className="flex flex-nowrap gap-x-8">
          <li>
            <a href="#">Algorithm</a>
          </li>
          <li>
            <a href="#">Front-End</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

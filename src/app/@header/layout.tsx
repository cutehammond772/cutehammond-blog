import { interBold } from "@/styles/fonts/inter";
import ThemeSelection from "@/app/@header/components/ThemeSelection";
import Link from "next/link";
import { Suspense } from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2 max-md:flex-col">
      <Link href="/" className={`${interBold.className} text-xl`}>
        cutehammond.dev
      </Link>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <ThemeSelection />
    </div>
  );
}

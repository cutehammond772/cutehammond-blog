import { interMedium } from "@/styles/fonts/inter";
import { notoSansBold } from "@/styles/fonts/notoSans";

import ThemeButton from "./ThemeButton";

export default function ThemeSelection() {
  return (
    <div
      className={`${interMedium.className} blog-lv1 rounded-xl p-4 flex flex-col flex-nowrap gap-4 justify-stretch`}
    >
      <div className={notoSansBold.className}>테마 설정하기</div>
      <div className="grid grid-cols-3 gap-2">
        <ThemeButton theme="light" />
        <ThemeButton theme="system" />
        <ThemeButton theme="dark" />
      </div>
    </div>
  );
}

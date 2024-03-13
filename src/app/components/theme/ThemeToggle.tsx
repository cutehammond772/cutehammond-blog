"use client";

import { THEME_ICONS } from "@/theme/theme";
import useTheme from "@/theme/useTheme";
import { ClientOnly } from "@/utils/components/ClientOnly";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <ClientOnly fallback={THEME_ICONS["System"]}>
      <button className="fp-bold" title="테마 설정" onClick={toggle}>
        {THEME_ICONS[theme]}
      </button>
    </ClientOnly>
  );
}

"use client";

import { THEME_ICONS } from "@/theme/theme";
import useTheme from "@/theme/useTheme";
import { ClientOnly } from "@/utils/components/ClientOnly";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <ClientOnly>
      <button className="fp-bold" onClick={toggle}>
        {THEME_ICONS[theme]}
      </button>
    </ClientOnly>
  );
}

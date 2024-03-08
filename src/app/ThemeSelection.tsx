"use client";

import { THEME_ICONS } from "@/theme/theme";
import useTheme from "@/theme/useTheme";
import { ClientOnly } from "./ClientOnly";

export default function ThemeSelection() {
  const { theme, toggle } = useTheme();

  return (
    <ClientOnly>
      <button className="fp-bold" onClick={toggle}>
        {THEME_ICONS[theme]}
      </button>
    </ClientOnly>
  );
}

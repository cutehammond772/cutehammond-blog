"use client";

import { ClientOnly } from "@/app/components/ClientOnly";
import { THEMES } from "@/theme/theme";
import useTheme from "@/theme/useTheme";

export default function ThemeSelection() {
  const [selected, setTheme] = useTheme();

  return (
    <ClientOnly>
      <div className="flex flex-row gap-2 px-2 py-1 font-bold">
        {THEMES.map((theme) => (
          <button
            className={`${selected == theme ? "bg-layer text-layer" : "bg-default text-default"} px-2 py-1`}
            key={theme}
            onClick={() => setTheme(theme)}
          >
            {theme}
          </button>
        ))}
      </div>
    </ClientOnly>
  );
}

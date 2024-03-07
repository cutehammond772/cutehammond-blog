"use client";

import { ClientOnly } from "@/app/ClientOnly";
import { THEMES } from "@/theme/theme";
import useTheme from "@/theme/useTheme";

function Skeleton() {
  return (
    <div className="bg-layer text-layer my-1 px-2 py-1 font-bold">
      Loading Themes
    </div>
  );
}

export default function ThemeSelection() {
  const [selected, setTheme] = useTheme();

  return (
    <ClientOnly fallback={<Skeleton />}>
      <div className="flex flex-row gap-2 py-1 font-bold">
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

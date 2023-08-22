"use client";

import useTheme from "@/features/theme/useTheme";
import { interMedium } from "@/styles/fonts/inter";

export default function ThemeToggleButton() {
  const { setTheme } = useTheme();

  return (
    <div
      className={`${interMedium.className} bg-slate-200 rounded-xl p-2 flex flex-row flex-nowrap gap-2`}
    >
      <button
        className="bg-slate-600 rounded-md px-2 py-1 text-white text-sm"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="bg-slate-600 rounded-md px-2 py-1 text-white text-sm"
        onClick={() => setTheme("system")}
      >
        System
      </button>
      <button
        className="bg-slate-600 rounded-md px-2 py-1 text-white text-sm"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
    </div>
  );
}

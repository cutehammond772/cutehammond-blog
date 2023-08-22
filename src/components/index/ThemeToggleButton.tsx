"use client";

import useTheme from "@/features/theme/useTheme";

export default function ThemeToggleButton() {
  const { setTheme } = useTheme();

  return (
    <div className="bg-slate-200 rounded-xl p-2 flex flex-row flex-nowrap gap-2">
      <button
        className="bg-slate-600 rounded-md p-1 text-white text-sm"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="bg-slate-600 rounded-md p-1 text-white text-sm"
        onClick={() => setTheme("system")}
      >
        System
      </button>
      <button
        className="bg-slate-600 rounded-md p-1 text-white text-sm"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
    </div>
  );
}

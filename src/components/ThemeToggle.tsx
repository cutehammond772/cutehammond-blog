"use client";

import { THEMES } from "@/theme/theme";
import ThemeButton from "./ThemeButton";

export default function ThemeToggle() {
  return (
    <div className="p-1 blog-lv1 rounded-full">
      {THEMES.map((theme) => (
        <ThemeButton key={theme} theme={theme} />
      ))}
    </div>
  );
}

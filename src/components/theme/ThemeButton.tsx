"use client";

import { memo, useEffect, useRef } from "react";
import useTheme from "@/utils/theme/useTheme";
import { Theme } from "@/components/theme/ThemeContainer";

const themes: { [theme in Theme]: { icon: string; subject: string } } = {
  dark: {
    icon: "🌙",
    subject: "Dark",
  },
  light: {
    icon: "🌞",
    subject: "Light",
  },
  system: {
    icon: "💻",
    subject: "System",
  },
};

export default memo(function ThemeButton({ theme }: { theme: Theme }) {
  const [selected, setTheme] = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected === theme) {
      ref.current?.classList?.add("blog-emphasize");
    } else {
      ref.current?.classList?.remove("blog-emphasize");
    }
  }, [selected, theme]);

  return (
    <button
      className="p-4 rounded-md transition ease-in-out"
      ref={ref}
      onClick={() => setTheme(theme)}
    >
      <div>{themes[theme].icon}</div>
      <div>{themes[theme].subject}</div>
    </button>
  );
});

"use client";

import { createContext, useEffect, useRef, useState } from "react";

export type AccessibleTheme = "dark" | "light" | "system";
export type Theme = AccessibleTheme | "uninitialized";

export interface ThemeContext {
  theme: Theme;
  setTheme: (theme: AccessibleTheme) => void;
}

interface ThemeDataSet {
  theme?: AccessibleTheme;
}

const defaultContext: ThemeContext = {
  theme: "uninitialized",
  setTheme: (_) => {},
};

export const ThemeContext = createContext<ThemeContext>(defaultContext);

export default function ThemeContainer({ children }: React.PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(defaultContext.theme);
  const preload = useRef<boolean>(false);

  // 처음 로드 시 로컬 스토리지에 저장된 테마를 불러온다.
  useEffect(() => {
    let storedTheme = localStorage.getItem("theme") as Theme | null;

    if (!storedTheme) {
      localStorage.setItem("theme", (storedTheme = "system"));
    }

    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (theme === "uninitialized") {
      // 로컬 스토리지에 저장된 테마를 불러오기 전이다.
      return;
    }

    if (!preload.current) {
      // 첫 로드 시 <body> 내 script에 의해 테마가 설정되므로, 처음에는 무시한다.
      preload.current = true;
      return;
    }

    const dset: ThemeDataSet = document.documentElement.dataset;
    const storedTheme = localStorage.getItem("theme") as Theme | null;

    if (storedTheme !== theme) {
      localStorage.setItem("theme", theme);
    }

    if (theme == "system") {
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dset.theme = sysDark ? "dark" : "light";
    } else {
      dset.theme = theme;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

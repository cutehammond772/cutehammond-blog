"use client";

import { useEffect } from "react";
import { atom, useRecoilValue } from "recoil";

export const Key = "blog_theme";

export type Theme = "dark" | "light" | "system";
const themes = ["dark", "light", "system"];

function isValid(theme: string | null): theme is Theme {
  return theme != null && themes.includes(theme);
}

const store = typeof window !== "undefined" ? window.localStorage : null;

export const themeState = atom<Theme>({
  key: Key,
  default: "system",
  effects: [
    ({ setSelf, onSet }) => {
      if (store) {
        const stored = store.getItem(Key);

        // LocalStorage에 저장된 값이 유효할 경우 초기값으로 설정한다.
        isValid(stored) && setSelf(stored);

        onSet((newValue, _, isReset) => {
          isReset ? store.removeItem(Key) : store.setItem(Key, newValue);
        });
      }
    },
  ],
});

interface ThemeDataSet {
  theme?: Theme;
}

export default function ThemeContainer({ children }: React.PropsWithChildren) {
  const theme = useRecoilValue(themeState);

  useEffect(() => {
    const dset: ThemeDataSet = document.documentElement.dataset;

    if (theme == "system") {
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dset.theme = sysDark ? "dark" : "light";
    } else {
      dset.theme = theme;
    }
  }, [theme]);

  return <>{children}</>;
}

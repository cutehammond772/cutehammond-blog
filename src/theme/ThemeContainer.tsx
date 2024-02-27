"use client";

import { useEffect } from "react";
import { atom, useRecoilValue } from "recoil";
import { THEMES, Theme } from "./theme";

export const Key = "theme";

function isValid(theme: string | null): theme is Theme {
  return !!theme && THEMES.includes(theme as Theme);
}

// Theme 로직은 Browser에서만 돌아가도록 해야 한다.
const store = typeof window !== "undefined" ? window.localStorage : null;

export const themeState = atom<Theme>({
  key: Key,
  default: "System",
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

    if (theme == "System") {
      const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      dset.theme = sysDark ? "Dark" : "Light";
      return;
    }

    dset.theme = theme;
  }, [theme]);

  return <>{children}</>;
}

"use client";

import { useRecoilState } from "recoil";
import { themeState } from "./ThemeContainer";

export default function useTheme() {
  return useRecoilState(themeState);
}

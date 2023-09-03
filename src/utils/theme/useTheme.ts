"use client";

import { useRecoilState } from "recoil";
import { themeState } from "@/components/theme/ThemeContainer";

export default function useTheme() {
  return useRecoilState(themeState);
}

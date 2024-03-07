import { useRecoilState } from "recoil";
import { themeState } from "@/theme/ThemeContainer";

export default function useTheme() {
  return useRecoilState(themeState);
}

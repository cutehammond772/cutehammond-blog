import { useContext } from "react";
import { ThemeContext } from "@/utils/theme/ThemeContainer";

export default function useTheme() {
  return useContext(ThemeContext);
}

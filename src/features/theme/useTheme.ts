import { useContext } from "react";
import { ThemeContext } from "@/features/theme/ThemeContainer";

export default function useTheme() {
  return useContext(ThemeContext);
}

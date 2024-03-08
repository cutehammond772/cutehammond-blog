import { Airplay, Moon, Sun } from "react-feather";

export const THEMES = ["Dark", "Light", "System"] as const;
export type Theme = (typeof THEMES)[number];

export const THEME_ICONS: { [theme in Theme]: React.ReactNode } = {
  Dark: <Moon className="fp-bold" />,
  Light: <Sun className="fp-bold" />,
  System: <Airplay className="fp-bold" />,
} as const;

export const THEMES = ["dark", "light", "system"] as const;
export const ICONS: { [theme in Theme]: string } = {
  dark: "🌙",
  light: "🌞",
  system: "💻",
};

export type Theme = (typeof THEMES)[number];

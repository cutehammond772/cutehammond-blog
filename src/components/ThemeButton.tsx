import { memo, useEffect, useRef } from "react";
import { ICONS, Theme } from "@/theme/theme";
import useTheme from "@/theme/useTheme";

function ThemeButton({ theme }: { theme: Theme }) {
  const [selected, setTheme] = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selected === theme) {
      ref.current?.classList?.add("blog-emphasize");
    } else {
      ref.current?.classList?.remove("blog-emphasize");
    }
  }, [selected, theme]);

  return (
    <button
      className="p-1 rounded-full transition ease-in-out"
      ref={ref}
      onClick={() => setTheme(theme)}
    >
      {ICONS[theme]}
    </button>
  );
}

export default memo(ThemeButton);

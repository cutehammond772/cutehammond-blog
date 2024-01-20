"use client";

import { RecoilRoot } from "recoil";
import ThemeContainer from "@/theme/ThemeContainer";

export default function BlogContainer({ children }: React.PropsWithChildren) {
  return (
    <RecoilRoot>
      <ThemeContainer>{children}</ThemeContainer>
    </RecoilRoot>
  );
}

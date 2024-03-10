"use client";

import { RecoilRoot } from "recoil";
import ThemeContainer from "@/theme/ThemeContainer";
import AuthProvider from "@/auth/AuthProvider";

export default function BlogContainer({ children }: React.PropsWithChildren) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <ThemeContainer>{children}</ThemeContainer>
      </AuthProvider>
    </RecoilRoot>
  );
}

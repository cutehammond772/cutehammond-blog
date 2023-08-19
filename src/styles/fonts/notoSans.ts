import { Noto_Sans_KR } from "next/font/google";

const bold = Noto_Sans_KR({
  weight: "700",
  subsets: ["latin"],
  fallback: ["system-ui"],
});
const medium = Noto_Sans_KR({
  weight: "400",
  subsets: ["latin"],
  fallback: ["system-ui"],
});

export { bold as notoSansBold, medium as notoSansMedium };

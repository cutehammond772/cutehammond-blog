import localFont from "next/font/local";

export const pretendard = localFont({
  src: [
    {
      path: "./Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Pretendard-Thin.woff2",
      weight: "100",
      style: "normal",
    },
  ],
  fallback: ["system-ui"],
});

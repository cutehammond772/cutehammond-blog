import { Inter } from "next/font/google";

const bold = Inter({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui"],
});

const medium = Inter({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui"],
});

export { bold as interBold, medium as interMedium };

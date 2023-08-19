import { Inter } from "next/font/google";

const bold = Inter({
  weight: "700",
  subsets: ["latin"],
  fallback: ["system-ui"],
});

const medium = Inter({
  weight: "500",
  subsets: ["latin"],
  fallback: ["system-ui"],
});

export { bold as interBold, medium as interMedium };

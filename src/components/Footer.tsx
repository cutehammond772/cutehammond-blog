import { interBold } from "@/styles/fonts/inter";

export type FooterScheme = { className: string };

export default function Footer({ className }: FooterScheme) {
  return (
    <footer
      className={`${className} ${interBold.className} z-50 px-8 py-4 flex flex-col desktop:flex-row gap-2 justify-between items-center border-t-2`}
    >
      <span>2023 Jungheon Lee</span>
      <a href="https://kr.freepik.com/icon/%ED%96%84%EC%8A%A4%ED%84%B0_616475">
        Logo made by Freepik
      </a>
    </footer>
  );
}

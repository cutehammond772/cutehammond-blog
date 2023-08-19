export type FooterScheme = { className: string };

export default function Footer({ className }: FooterScheme) {
  return (
    <footer
      className={`${className} z-50 px-8 py-4 flex flex-col sm:flex-row gap-2 justify-between items-center bg-black text-white`}
    >
      <span>2023 Jungheon Lee</span>
      <a href="https://kr.freepik.com/icon/%ED%96%84%EC%8A%A4%ED%84%B0_616475">
        Logo made by Freepik
      </a>
    </footer>
  );
}

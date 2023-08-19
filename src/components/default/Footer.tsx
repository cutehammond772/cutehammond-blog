export type FooterScheme = { className: string };

export default function Footer({ className }: FooterScheme) {
  return (
    <footer
      className={`${className} z-50 px-8 py-4 flex gap-4 justify-between items-center bg-black`}
    >
      <span className="text-white">2023 Jungheon Lee</span>
      <a
        href="https://github.com/cutehammond772"
        className="no-underline rounded-lg text-black bg-white hover:bg-gray px-4 py-2"
      >
        Github
      </a>
    </footer>
  );
}

// 웹 페이지가 렌더링되기 전에 테마를 설정한다.
const themeScript = `(function() {
  let theme = window.localStorage.getItem("theme");

  if (!theme) {
    window.localStorage.setItem("theme", (theme = "system"));
  }

  document.documentElement.dataset.theme = 
  (theme == "system") ? (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light") : theme;
})()`;

export default function ThemePreloadScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

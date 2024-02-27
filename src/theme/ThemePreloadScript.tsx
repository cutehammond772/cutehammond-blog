// 웹 페이지가 렌더링되기 전에 테마를 설정한다.
const themeScript = `(function() {
  let theme = window.localStorage.getItem("theme");

  if (!theme) {
    window.localStorage.setItem("theme", (theme = "System"));
  }

  document.documentElement.dataset.theme = 
  (theme == "System") ? (window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "Dark" : "Light") : theme;
})()`;

export default function ThemePreloadScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}

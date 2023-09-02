import { notoSansBold } from "@/styles/fonts/notoSans";

import Article from "@/components/index/Article";
import ThemeSelection from "@/components/theme/ThemeSelection";

export default async function Page() {
  return (
    <div
      className={`${notoSansBold.className} flex flex-nowrap flex-col mt-32 px-8 tablet:px-0`}
    >
      <section className="flex flex-col gap-y-8 tablet:gap-y-24">
        <ThemeSelection />
        <h1>최근에 올린 글</h1>
        <div className="flex flex-nowrap flex-col gap-y-12 tablet:gap-y-24">
          <Article boj={1000} />
          <Article boj={1001} />
          <Article boj={1002} />
        </div>
      </section>
    </div>
  );
}

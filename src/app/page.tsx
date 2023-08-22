import Article from "@/components/index/Article";
import ThemeToggleButton from "@/components/index/ThemeToggleButton";
import { notoSansBold } from "@/styles/fonts/notoSans";

export default function Page() {
  return (
    <div
      className={`${notoSansBold.className} flex flex-nowrap flex-col mt-32 px-8 tablet:px-0`}
    >
      <section className="flex flex-col gap-y-8 tablet:gap-y-24">
        <h1 className="text-primary text-2xl tablet:text-4xl">
          최근에 올린 글
        </h1>
        <ThemeToggleButton />
        <div className="flex flex-nowrap flex-col gap-y-12 tablet:gap-y-24">
          <Article boj={1000} />
          <Article boj={1001} />
          <Article boj={1002} />
        </div>
      </section>
    </div>
  );
}

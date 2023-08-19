import Article from "@/components/index/Article";
import { notoSansBold } from "@/styles/fonts/notoSans";

export default function Page() {
  return (
    <div
      className={`${notoSansBold.className} flex flex-nowrap flex-col mt-32 px-8 md:px-0`}
    >
      <section className="flex flex-col gap-y-8 sm:gap-y-16 md:gap-y-24">
        <h1 className="text-2xl sm:text-4xl">최근에 올린 글</h1>
        <div className="flex flex-nowrap flex-col gap-y-12 sm:gap-y-24">
          <Article boj={10} />
        </div>
      </section>
    </div>
  );
}

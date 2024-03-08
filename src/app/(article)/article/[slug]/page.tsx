import { Metadata } from "next";

import { load } from "@/utils/article/github";
import { convertDate } from "@/utils/date";

import ArticleBody from "./components/ArticleBody";

export interface ArticlePageParams {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: ArticlePageParams): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.slug),
  };
}

export default async function Page({ params }: ArticlePageParams) {
  const title = decodeURIComponent(params.slug);
  const article = await load({ title });

  return (
    <>
      <div className="bg-beige-300 dark:bg-charcoal-700 flex flex-col items-center gap-2 px-4 pb-4 pt-48">
        <span className="f1-bold break-keep text-center leading-normal md:pb-8">
          {title}
        </span>
        <span className="fp-bold text-center">
          {convertDate(article.createdDate)} 생성 (
          {convertDate(article.modifiedDate)} 수정)
        </span>
        <span className="fp-bold flex flex-row flex-wrap gap-2">
          {article.tag.map((tag) => (
            <span
              key={tag}
              className="bg-beige-500 dark:bg-charcoal-500 px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </span>
        <hr className="bg-layer h-[2px] border-0" />
      </div>
      <article className="px-4 md:px-0">
        <ArticleBody markdown={article.markdown} />
      </article>
    </>
  );
}

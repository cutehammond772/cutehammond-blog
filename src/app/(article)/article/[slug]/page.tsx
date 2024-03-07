import { Metadata } from "next";

import { load } from "@/utils/article/github";
import { notoSansMedium } from "@/styles/fonts/notoSans";
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
    <article className={notoSansMedium.className}>
      <div className="mt-48 flex flex-col justify-end gap-2 pb-4">
        <span className="break-keep pb-4 text-4xl font-bold leading-normal md:pb-8">
          {title}
        </span>
        <span className="text-base font-bold">
          {convertDate(article.createdDate)} 생성 (
          {convertDate(article.modifiedDate)} 수정)
        </span>
        <span className="flex flex-row flex-wrap gap-2 text-base">
          {article.tag.map((tag) => (
            <span key={tag} className="bg-layer text-layer px-2 py-1 font-bold">
              #{tag}
            </span>
          ))}
        </span>
        <hr className="bg-layer h-[2px] border-0" />
      </div>
      <ArticleBody markdown={article.markdown} />
    </article>
  );
}

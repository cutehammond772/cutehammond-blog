import { notoSansBold } from "@/styles/fonts/notoSans";
import { Metadata } from "next";

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

export default function Page({ params }: ArticlePageParams) {
  return (
    <div className={notoSansBold.className}>
      <div className="mt-48 flex flex-col justify-end border-b-2 pb-4">
        <span className="break-all pb-8 text-2xl leading-normal md:text-4xl">
          {decodeURIComponent(params.slug)}
        </span>
        <span className="text-base">2024-02-27</span>
        <span className="break-keep text-base">
          #알고리즘 #다이나믹프로그래밍 #크누스최적화
        </span>
      </div>
    </div>
  );
}

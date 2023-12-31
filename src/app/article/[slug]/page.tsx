import { notoSansBold } from "@/styles/fonts/notoSans";
import { Metadata } from "next";

export interface ArticlePageParams {
  params: { slug: string };
}

// 타이틀 변경
export async function generateMetadata({
  params,
}: ArticlePageParams): Promise<Metadata> {
  return {
    title: decodeURIComponent(params.slug),
  };
}

export default function Page({ params }: ArticlePageParams) {
  return (
    <div className={`${notoSansBold.className}`}>
      <div className="text-2xl p-4 min-h-[40vh] border-b-2 flex flex-col justify-end">
        <div className="break-all">{decodeURIComponent(params.slug)}</div>
      </div>
    </div>
  );
}

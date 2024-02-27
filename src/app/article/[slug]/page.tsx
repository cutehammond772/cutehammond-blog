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
      <div className="flex min-h-[40vh] flex-col justify-end border-b-2 p-4">
        <h1 className="break-all">{decodeURIComponent(params.slug)}</h1>
      </div>
    </div>
  );
}

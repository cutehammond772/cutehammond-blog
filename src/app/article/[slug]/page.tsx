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
  return <div>{decodeURIComponent(params.slug)}</div>;
}

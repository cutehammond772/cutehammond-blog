import { MDXRemote } from "next-mdx-remote/rsc";

export interface ArticleBodyProps {
  markdown: string;
}

export default async function ArticleBody({ markdown }: ArticleBodyProps) {
  return <MDXRemote source={markdown} />;
}

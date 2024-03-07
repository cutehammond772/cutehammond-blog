import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "./mdx-components";

export interface ArticleBodyProps {
  markdown: string;
}

export default async function ArticleBody({ markdown }: ArticleBodyProps) {
  return <MDXRemote source={markdown} components={mdxComponents} />;
}

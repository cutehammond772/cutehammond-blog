import { cache } from "react";
import { Octokit } from "octokit";
import matter from "gray-matter";

import { decode } from "@/utils/base64";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export type ArticleMetadata = {
  tag: string[];
  createdDate: Date;
  modifiedDate: Date;
};

export type ArticleRequest = {
  title: string;
  draft?: boolean;
};

export type ArticleResponse =
  | ({ error: false; markdown: string } & ArticleMetadata)
  | { error: true };

function isMetadata(target: any): target is ArticleMetadata {
  return "tag" in target && "createdDate" in target && "modifiedDate" in target;
}

export const load = cache(
  async ({ title, draft }: ArticleRequest): Promise<ArticleResponse> => {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: "cutehammond772",
        path: `articles/${title}.mdx`,
        repo: "blog-articles",
        ref: draft ? "draft" : undefined,
      });

      if (!("content" in data)) return { error: true };

      const { content: markdown, data: frontMatter } = matter(
        decode(data.content)
      );

      if (!isMetadata(frontMatter)) return { error: true };

      return { error: false, markdown, ...frontMatter };
    } catch (e) {
      return { error: true };
    }
  }
);

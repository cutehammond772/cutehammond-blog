import { cache } from "react";
import { Octokit } from "octokit";
import matter from "gray-matter";

import { decode } from "@/utils/base64";
import { notFound } from "next/navigation";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export type ArticleMetadata = {
  tag: string[];
  createdDate: Date;
  modifiedDate: Date;
};

export type ArticleListRequest = {
  draft?: boolean;
};

export type ArticleListResponse = { entries: string[] };

export type ArticleRequest = {
  title: string;
  draft?: boolean;
};

export type ArticleResponse = {
  title: string;
  markdown: string;
} & ArticleMetadata;

function isMetadata(target: any): target is ArticleMetadata {
  return "tag" in target && "createdDate" in target && "modifiedDate" in target;
}

export const list = cache(
  async ({ draft }: ArticleListRequest): Promise<ArticleListResponse> => {
    try {
      const { data } = await octokit.rest.repos.getContent({
        // TODO: GITHUB 의존성 분리 작업 필요
        owner: "cutehammond772",
        path: "articles",
        repo: "blog-articles",
        ref: draft ? "draft" : undefined,
      });

      // TODO: Test Logic 필요
      if (!Array.isArray(data)) throw new Error();

      return {
        entries: data
          .filter((entry) => entry.name.endsWith(".mdx"))
          .map((entry) => entry.name.replace(".mdx", "")),
      };
    } catch (error) {
      if (error instanceof Error) {
        // Article 디렉토리가 존재하지 않으면 404를 반환한다.
        if (error.message.includes("Not Found")) notFound();
        else throw error;
      }

      throw error;
    }
  }
);

export const load = cache(
  async ({ title, draft }: ArticleRequest): Promise<ArticleResponse> => {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner: "cutehammond772",
        path: `articles/${title}.mdx`,
        repo: "blog-articles",
        ref: draft ? "draft" : undefined,
      });

      if (!("content" in data)) throw new Error();

      const { content: markdown, data: frontMatter } = matter(
        decode(data.content)
      );

      if (!isMetadata(frontMatter)) throw new Error();

      return { title, markdown, ...frontMatter };
    } catch (error) {
      if (error instanceof Error) {
        // Article이 존재하지 않으면 404를 반환한다.
        if (error.message.includes("Not Found")) notFound();
        else throw error;
      }

      throw error;
    }
  }
);

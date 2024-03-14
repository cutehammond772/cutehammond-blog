import { notFound } from "next/navigation";
import { Octokit } from "octokit";
import matter from "gray-matter";

import { decode } from "@/utils/base64";
import { cache } from "react";

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export type ArticleMetadata = {
  tag: string[];
  createdDate: string;
  modifiedDate: string;
};

export type ErrorResponse = { error: true; httpCode: number; reason?: string };

export type ArticleListRequest = {
  draft?: boolean;
};

export type ArticleListResponse = { error: false; entries: string[] };

export type ArticleRequest = {
  title: string;
  draft?: boolean;
};

export type ArticleResponse = {
  error: false;
  title: string;
  markdown: string;
} & ArticleMetadata;

function isMetadata(target: any): target is ArticleMetadata {
  return "tag" in target && "createdDate" in target && "modifiedDate" in target;
}

export const list = cache(
  async ({
    draft,
  }: ArticleListRequest): Promise<ErrorResponse | ArticleListResponse> => {
    try {
      const { data } = await octokit.rest.repos.getContent({
        // TODO: GITHUB 의존성 분리 작업 필요
        owner: "cutehammond772",
        path: "articles",
        repo: "blog-articles",
        ref: draft ? "draft" : undefined,
      });

      // TODO: Test Logic 필요
      if (!Array.isArray(data)) return { error: true, httpCode: 503 };

      return {
        error: false,
        entries: data
          .filter((entry) => entry.name.endsWith(".mdx"))
          .map((entry) => entry.name.replace(".mdx", "")),
      };
    } catch (error) {
      if (error instanceof Error) {
        // Article 디렉토리가 존재하지 않으면 404를 반환한다.
        if (error.message.includes("Not Found"))
          return { error: true, httpCode: 404 };
      }

      return { error: true, httpCode: 503 };
    }
  }
);

export const load = cache(
  async ({
    title,
    draft,
  }: ArticleRequest): Promise<ErrorResponse | ArticleResponse> => {
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

      return { error: false, title, markdown, ...frontMatter };
    } catch (error) {
      if (error instanceof Error) {
        // Article이 존재하지 않으면 404를 반환한다.
        if (error.message.includes("Not Found"))
          return { error: true, httpCode: 404 };
      }

      return { error: true, httpCode: 503 };
    }
  }
);

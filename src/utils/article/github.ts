import { cache } from "react";
import { Octokit } from "octokit";

import matter from "gray-matter";
import { decode } from "@/utils/base64";
import {
  ArticleListLoader,
  ArticleLoader,
  generateArticleSource,
  isMetadata,
} from ".";

import {
  ArticleDirectoryNotFoundError,
  ArticleError,
  ArticleNotFoundError,
  InvalidArticleDirectoryError,
  InvalidArticleError,
} from "./error";
import { fetchWith } from "../server";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export const source = generateArticleSource("GITHUB");

function isGithub404Error(error: any) {
  return error instanceof Error && error.message.includes("Not Found");
}

// TODO: Github Data를 별도로 관리해야 함
const userData = {
  user: "cutehammond772",
  repository: "blog-articles",
  path: "articles",
} as const;

export const list: ArticleListLoader = cache(async ({ draft }) => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: userData.user,
      repo: userData.repository,
      path: userData.path,
      ref: draft ? "draft" : undefined,
      request: {
        fetch: fetchWith(source.LIST_TAG),
      },
    });

    /* Case. Article Directory의 위치가 Directory가 아닌 경우 */
    if (!Array.isArray(data))
      throw new InvalidArticleDirectoryError(source.ARTICLE_SOURCE, 400);

    return {
      articles: data
        .filter((entry) => entry.name.endsWith(".mdx"))
        .map((entry) => entry.name.replace(".mdx", "")),
    };
  } catch (error) {
    if (error instanceof ArticleError) throw error;

    /* Case. Article Directory가 존재하지 않는 경우 */
    if (isGithub404Error(error))
      throw new ArticleDirectoryNotFoundError(source.ARTICLE_SOURCE, 404);

    /* Case. 기타 Error */
    throw new InvalidArticleDirectoryError(source.ARTICLE_SOURCE, 500);
  }
});

export const load: ArticleLoader = cache(async ({ title, draft }) => {
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: userData.user,
      path: `${userData.path}/${title}.mdx`,
      repo: userData.repository,
      ref: draft ? "draft" : undefined,
      request: {
        fetch: fetchWith(source.ARTICLE_GROUP, source.ARTICLE_TAG(title)),
      },
    });

    /* Case. Github API로 가져온 data에 content가 존재하지 않을 경우 */
    if (!("content" in data))
      throw new InvalidArticleError(source.ARTICLE_SOURCE, 500);

    const { content: markdown, data: frontMatter } = matter(
      decode(data.content)
    );

    /* Case. Article의 정보가 유효하지 않을 경우 */
    if (!isMetadata(frontMatter))
      throw new InvalidArticleError(source.ARTICLE_SOURCE, 500);

    return { title, markdown, ...frontMatter };
  } catch (error) {
    if (error instanceof ArticleError) throw error;

    /* Case. Article이 존재하지 않는 경우 */
    if (isGithub404Error(error))
      throw new ArticleNotFoundError(source.ARTICLE_SOURCE, 404);

    /* Case. 기타 Error */
    throw new InvalidArticleError(source.ARTICLE_SOURCE, 500);
  }
});

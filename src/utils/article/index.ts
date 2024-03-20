/* Article Metadata */
export interface ArticleMetadata {
  tag: string[];
  createdDate: string;
  modifiedDate: string;
}

export function isMetadata(target: any): target is ArticleMetadata {
  return "tag" in target && "createdDate" in target && "modifiedDate" in target;
}

/* Article Source */
export function generateArticleSource(source: string) {
  return {
    ARTICLE_SOURCE: source,
    LIST_TAG: `${source}_LIST`,
    ARTICLE_GROUP: `${source}_ARTICLE_GROUP`,
    ARTICLE_TAG: (article: string) =>
      `${source}_ARTICLE_[${encodeURI(article)}]`,
  };
}

/* Request & Response */
export type ArticleListRequest = {
  draft?: boolean;
};

export type ArticleRequest = {
  title: string;
  draft?: boolean;
};

export type ArticleListResponse = { articles: string[] };

export type ArticleResponse = {
  title: string;
  markdown: string;
} & ArticleMetadata;

/* Load Functions */
export type ArticleListLoader = (
  request: ArticleListRequest
) => Promise<ArticleListResponse>;

export type ArticleLoader = (
  request: ArticleRequest
) => Promise<ArticleResponse>;

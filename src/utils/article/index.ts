export type ArticleMetadata = {
  tag: string[];
  createdDate: string;
  modifiedDate: string;
};

export type ArticleListRequest = {
  draft?: boolean;
};

export type ArticleListResponse = { articles: string[] };

export type ArticleRequest = {
  title: string;
  draft?: boolean;
};

export type ArticleResponse = {
  title: string;
  markdown: string;
} & ArticleMetadata;

export function isMetadata(target: any): target is ArticleMetadata {
  return "tag" in target && "createdDate" in target && "modifiedDate" in target;
}

export type ArticleListLoader = (
  request: ArticleListRequest
) => Promise<ArticleListResponse>;

export type ArticleLoader = (
  request: ArticleRequest
) => Promise<ArticleResponse>;

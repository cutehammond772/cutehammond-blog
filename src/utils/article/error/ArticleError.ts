import HTTPError from "../../HTTPError";

export default class ArticleError extends HTTPError {
  public source: string;

  constructor(source: string, httpCode: number) {
    super(httpCode);

    this.source = source;
  }
}

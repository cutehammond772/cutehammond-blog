export default class HTTPError extends Error {
  public httpCode: number;

  constructor(httpCode: number) {
    super();
    this.httpCode = httpCode;
  }
}

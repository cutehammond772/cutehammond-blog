import HTTPError from "./HTTPError";

export type ServerResponse<T> =
  | { error: false; payload: T }
  | { error: true; name: "unknown" }
  | {
      error: true;
      name: string;
      httpCode: number;
    };

export function fetchWith(...tags: string[]): typeof fetch {
  return (input: string | URL | Request, init?: RequestInit) =>
    fetch(input, { ...init, next: { tags } });
}

export function actionHandler<P = void, Q = void>(
  func: (payload: P) => Promise<Q>
): (payload: P) => Promise<ServerResponse<Q>> {
  return async (payload) => {
    try {
      const result = await func(payload);
      return { error: false, payload: result };
    } catch (e) {
      if (e instanceof HTTPError) {
        return { error: true, name: e.name, httpCode: e.httpCode };
      }

      return { error: true, name: "unknown" };
    }
  };
}

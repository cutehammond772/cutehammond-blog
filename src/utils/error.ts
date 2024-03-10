export type ServerResponseWithPayload<T> =
  | { error: false; payload: T }
  | { error: "UNKNOWN" }
  | {
      error: string;
      httpCode: number;
    };

export type ServerResponse =
  | { error: false }
  | { error: "UNKNOWN" }
  | {
      error: string;
      httpCode: number;
    };

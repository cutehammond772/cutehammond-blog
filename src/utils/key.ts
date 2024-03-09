import { randomUUID } from "crypto";

export type Signature =
  `${string}::${string}-${string}-${string}-${string}-${string}`;

// Client에서는 사용할 수 없다.
export function createKey(name: string): Signature {
  return `${name}::${randomUUID()}`;
}

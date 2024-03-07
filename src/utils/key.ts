import { randomUUID } from "crypto";

export type Signature =
  `${string}::${string}-${string}-${string}-${string}-${string}`;

export function createKey(name: string): Signature {
  return `${name}::${randomUUID()}`;
}

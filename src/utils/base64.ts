export function decode(data: string) {
  return Buffer.from(data, "base64").toString("utf-8");
}

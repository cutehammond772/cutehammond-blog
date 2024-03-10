import { kv } from "@vercel/kv";

/**
 * 해당 Key의 존재 여부를 확인합니다.
 */
export async function exists(key: string) {
  return (await kv.exists(key)) > 0;
}

/**
 * 특정 Key에 payload를 등록합니다.
 */
export async function set(key: string, payload: any) {
  await kv.hmset(key, payload);
}

/**
 * 특정 Key의 Field에 대한 값을 반환합니다.
 */
export async function get(key: string, field: string) {
  return await kv.hget<string>(key, field);
}

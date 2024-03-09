export function convertDate(rawDate: string) {
  const date = new Date(rawDate);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}

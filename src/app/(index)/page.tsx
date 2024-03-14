import { convertDate } from "@/utils/date";
import { ArticleResponse, list, load } from "@/utils/article/github";

import ArticleCard from "./components/ArticleCard";

export default async function Page() {
  const listPayload = await list({});

  if (listPayload.error) throw new Error();

  // 모든 글을 불러온다.
  const articlesPayload = await Promise.all(
    listPayload.entries.map((title) => load({ title }))
  );

  // 글 중에 하나라도 불러오지 못하면 오류를 발생시킨다.
  if (articlesPayload.some((a) => a.error)) throw new Error();

  const articles = articlesPayload.filter(
    (a): a is ArticleResponse => !a.error
  );

  // 날짜 순으로 정렬한다. (가장 늦게 나온 게시글이 먼저 오도록 한다.)
  articles
    .filter((a): a is ArticleResponse => !a.error)
    .sort(
      (a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

  return (
    <>
      <div className="f3-bold mb-8 mt-24 px-4 md:mt-48 md:px-0">
        최근 작성된 글
      </div>
      <div className="flex flex-col gap-6">
        {articles.map(({ title, createdDate, tag }) => (
          <ArticleCard
            title={title}
            createdDate={convertDate(createdDate)}
            tags={tag}
            key={title}
          />
        ))}
      </div>
    </>
  );
}

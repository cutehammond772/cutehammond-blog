import { convertDate } from "@/utils/date";
import { list, load } from "@/utils/article/github";

import ArticleCard from "./components/ArticleCard";

export default async function Page() {
  const articleTitles = await list({});

  // 모든 글 목록이다.
  const articles = await Promise.all(
    articleTitles.entries.map((title) => load({ title }))
  );

  // 날짜 순으로 정렬한다. (가장 늦게 나온 게시글이 먼저 오도록 한다.)
  articles.sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  return (
    <>
      <div className="f3-bold mb-8 mt-24 px-4 md:mt-48 md:px-0">모든 글</div>
      <div className="grid grid-flow-row grid-cols-1 gap-4 xl:grid-cols-2">
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

import { convertDate } from "@/utils/date";
import { list, load } from "@/utils/article/github";

import ArticleCard from "./components/ArticleCard";

export default async function Page() {
  const articleList = await list({});

  // 모든 글 목록이다.
  // TODO: title? entry? 명칭을 확실히 정하기
  const entries = await Promise.all(
    articleList.entries.map((entry) => load({ title: entry }))
  );

  return (
    <>
      <div className="mb-12 mt-24 text-2xl font-bold md:mt-48 md:text-4xl">
        모든 글
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-x-8 gap-y-24 xl:grid-cols-2">
        {entries.map(({ title, createdDate, tag }) => (
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

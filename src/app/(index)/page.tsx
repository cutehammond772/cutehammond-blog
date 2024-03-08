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
      <div className="f3-bold mb-8 mt-24 px-4 md:mt-48 md:px-0">모든 글</div>
      <div className="grid grid-flow-row grid-cols-1 gap-4 xl:grid-cols-2">
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

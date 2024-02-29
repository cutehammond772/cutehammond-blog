import ArticleCard from "./components/ArticleCard";

export default async function Page() {
  return (
    <>
      <div className="mb-12 mt-24 text-2xl font-bold md:mt-48 md:text-4xl">
        모든 글
      </div>
      <div className="grid grid-flow-row grid-cols-1 gap-x-8 gap-y-24 xl:grid-cols-2">
        <ArticleCard
          title="BOJ 13974 : 파일 합치기 2"
          createdDate="2024-02-27"
          tags={["알고리즘", "DP", "크누스 최적화"]}
        />
        <ArticleCard
          title="BOJ 1000 : A + B"
          createdDate="2024-02-28"
          tags={["수학", "구현"]}
        />
      </div>
    </>
  );
}

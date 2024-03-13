import ArticleCardSkeleton from "./components/ArticleCardSkeleton";

export default function Loading() {
  return (
    <>
      <div className="f3-bold mb-8 mt-24 animate-pulse px-4 md:mt-48 md:px-0">
        최근 작성된 글
      </div>
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6].map((x) => (
          <ArticleCardSkeleton key={x} />
        ))}
      </div>
    </>
  );
}

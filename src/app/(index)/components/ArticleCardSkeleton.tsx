import { Clock } from "react-feather";

export default function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col justify-between gap-2 bg-beige-300 p-4 dark:bg-charcoal-700">
      <div className="h-[24px] w-[20rem] animate-pulse bg-text-500 dark:bg-text-300 md:h-[30px]" />
      <div className="flex animate-pulse flex-col gap-2">
        <span className="flex flex-row items-center gap-2">
          <Clock size={16} />{" "}
          <span className="h-[24px] w-[10rem] bg-text-500 dark:bg-text-300 md:h-[30px]" />
        </span>
        <div className="self-start bg-beige-500 px-2 py-1 dark:bg-charcoal-500">
          <div className="h-[24px] w-[4rem] md:h-[30px]" />
        </div>
      </div>
    </div>
  );
}

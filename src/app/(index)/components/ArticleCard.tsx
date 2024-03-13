import { memo } from "react";
import Link from "next/link";

import { Clock } from "react-feather";

export interface ArticleCardProps {
  title: string;
  createdDate: string;
  tags: string[];
}

function ArticleCard({ title, createdDate, tags }: ArticleCardProps) {
  return (
    <Link href={`/article/${title}`}>
      <div className="flex flex-col justify-between gap-2 bg-beige-300 p-4 dark:bg-charcoal-700">
        <div className="fp-bold overflow-hidden text-ellipsis whitespace-nowrap text-nowrap">
          {title}
        </div>
        <div className="flex flex-col gap-2">
          <span className="flex flex-row items-center gap-2">
            <Clock size={16} /> {createdDate}
          </span>
          {tags && (
            <div className="fp-bold self-start overflow-hidden text-ellipsis whitespace-nowrap text-nowrap bg-beige-500 px-2 py-1 text-center dark:bg-charcoal-500">
              {tags[0]}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default memo(ArticleCard);

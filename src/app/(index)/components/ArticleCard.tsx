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
      <div className="flex min-h-full flex-col justify-between gap-2 bg-beige-300 p-4 dark:bg-charcoal-700">
        <div className="f3-bold">{title}</div>
        <div className="flex flex-col gap-2">
          <span className="flex flex-row items-center gap-2">
            <Clock size={16} /> {createdDate}
          </span>
          <div className="fp-bold flex flex-row flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-beige-500 px-2 py-1 dark:bg-charcoal-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ArticleCard);

import { memo } from "react";
import Link from "next/link";

import { Clock, Hash } from "react-feather";

export interface ArticleCardProps {
  title: string;
  createdDate: `${number}-${number}-${number}`;
  tags: string[];
}

function ArticleCard({ title, createdDate, tags }: ArticleCardProps) {
  return (
    <Link href={`/article/${title}`}>
      <div className="grid grid-rows-[2fr_1fr] transition-shadow hover:shadow-2xl">
        <div className="h-[20rem] bg-white"></div>
        <div className="row-auto flex flex-col gap-2 p-4 pt-8">
          <div className="flex-grow text-2xl font-bold">{title}</div>
          <div className="flex flex-col gap-2">
            <span className="flex flex-row items-center gap-2">
              <Clock size={16} /> {createdDate}
            </span>
            <span className="flex flex-row items-center gap-2 font-bold">
              <Hash size={16} />
              {tags.map((tag) => (
                <span key={tag} className="bg-layer text-layer px-2 py-1">
                  {tag}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ArticleCard);

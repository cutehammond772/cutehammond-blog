import Link from "next/link";

export interface AtricleScheme {
  title?: string;
  description?: string;

  boj?: number;
}

export default function Article({
  title = "기본 제목",
  description = "기본 내용",
  boj,
}: AtricleScheme) {
  return (
    <Link href={`/article/${encodeURIComponent(title)}`}>
      <article className="grid desktop:grid-cols-[minmax(_24rem,1fr)_2fr] gap-8">
        <div className="relative blog-lv1 h-60 rounded-xl">
          {boj && (
            <div className="absolute right-4 top-4 w-auto h-auto px-2 py-1 blog-lv2 rounded-md pointer-events-none">
              BOJ {boj}
            </div>
          )}
        </div>
        <div className="grid grid-rows-[1fr_4fr] gap-4">
          <h2>{title}</h2>
          {description}
        </div>
      </article>
    </Link>
  );
}
